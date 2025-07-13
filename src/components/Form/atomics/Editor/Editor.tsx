import { $generateHtmlFromNodes } from '@lexical/html';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { ListItemNode, ListNode } from '@lexical/list';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { EditorRefPlugin } from '@lexical/react/LexicalEditorRefPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { EditorState, LexicalEditor } from 'lexical';
import * as React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import useBaseController from '../../controls/useBaseController';
import PluginContext, {
  PluginContextProps,
  PluginState,
  QueryStatus,
  VariableItem,
} from './PluginContext.tsx';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import VariablePlugin, { VariableNode } from './plugins/VariablePlugin';

interface LexicalEditorProps {
  name: string;
  listVariablesQuery: {
    data: VariableItem[];
    status: QueryStatus;
  };
}

const Editor: React.FC<LexicalEditorProps> = ({ name, listVariablesQuery }) => {
  const formMethods = useFormContext();

  const { fieldProps, showError, errorMessage } = useBaseController({
    name,
  });

  const editorRef = useRef<LexicalEditor>(null);

  const initialConfig = useMemo(() => {
    return {
      // editorState: fieldProps.value,
      namespace: 'Editor',
      onError: (error: unknown) => console.log(error),
      nodes: [VariableNode, ListNode, ListItemNode, AutoLinkNode, LinkNode],
      theme: {
        text: {
          bold: 'font-bold',
          italic: 'italic',
          underline: 'underline',
        },
        list: {
          listitem: 'mx-8',
          nested: {
            listitem: 'mx-8',
          },
          ol: 'list-decimal',
          ul: 'list-disc',
        },
      },
    };
  }, []);

  const [pluginState, setPluginState] = useState<PluginState>({
    isBold: false,
    isItalic: false,
    isUnderline: false,
    blockType: null,
    variablePlugin: {
      data: listVariablesQuery.data,
      status: listVariablesQuery.status,
    },
  });

  const updatePluginState = useCallback((changes: Partial<PluginState>) => {
    setPluginState((prev) => ({
      ...prev,
      ...changes,
    }));
  }, []);

  const pluginContextValue = useMemo<PluginContextProps>(() => {
    return {
      ...pluginState,
      updateState: updatePluginState,
    };
  }, [pluginState, updatePluginState]);

  useEffect(() => {
    if (editorRef.current) {
      const initialEditorState = editorRef.current.parseEditorState(
        fieldProps.value,
      );
      editorRef.current.setEditorState(initialEditorState);
    }
  }, []);

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <PluginContext.Provider value={pluginContextValue}>
        <EditorRefPlugin editorRef={editorRef} />

        <ListPlugin />

        <LinkPlugin />

        <OnChangePlugin
          onChange={(_editorState: EditorState, editor: LexicalEditor) => {
            editor.update(() => {
              const html = $generateHtmlFromNodes(editor, null);

              fieldProps.onChange(JSON.stringify(_editorState.toJSON()));

              setTimeout(() => {
                formMethods.setValue('bodyHtml', html);
              });
            });
          }}
        />

        <VariablePlugin query={listVariablesQuery} />

        <div className="border border-gray-300 rounded-md">
          <div className="border-b border-gray-300">
            <ToolbarPlugin />
          </div>

          <div>
            <RichTextPlugin
              contentEditable={
                <ContentEditable className="py-1 px-3 min-h-52 outline-none resize-y overflow-auto" />
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
          </div>
        </div>

        {showError && <div className="mt-1 text-red-500">{errorMessage}</div>}
      </PluginContext.Provider>
    </LexicalComposer>
  );
};

export default Editor;
