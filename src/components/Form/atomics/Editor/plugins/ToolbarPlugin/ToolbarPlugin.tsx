import {
  BoldOutlined,
  ItalicOutlined,
  OrderedListOutlined,
  UnderlineOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import {
  $isListNode,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListNode,
  REMOVE_LIST_COMMAND,
} from '@lexical/list';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $findMatchingParent,
  $getNearestNodeOfType,
  mergeRegister,
} from '@lexical/utils';
import { Button, ButtonProps } from 'antd';
import {
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  FORMAT_TEXT_COMMAND,
} from 'lexical';
import React, { useCallback, useEffect } from 'react';

import { usePluginContext } from '../../PluginContext.tsx';
import AddVariableDropdown from '../VariablePlugin/AddVariableDropdown.tsx';

const Divider = () => {
  return (
    <div className="self-stretch flex items-center">
      <div className="h-3/5 w-px bg-gray-300" />
    </div>
  );
};

interface ButtonItemProps extends ButtonProps {
  isActive: boolean;
}

const ButtonItem: React.FC<ButtonItemProps> = ({ isActive, ...props }) => {
  return (
    <Button
      color={isActive ? 'primary' : 'default'}
      variant={isActive ? 'filled' : 'text'}
      type="text"
      shape="circle"
      {...props}
    />
  );
};

const ToolbarPlugin: React.FC = () => {
  const [editor] = useLexicalComposerContext();

  const { isBold, isItalic, isUnderline, blockType, updateState } =
    usePluginContext();

  const handleBold = useCallback(() => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
  }, [editor]);

  const handleItalic = useCallback(() => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
  }, [editor]);

  const handleUnderline = useCallback(() => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
  }, [editor]);

  const handleOrderList = useCallback(() => {
    if (blockType !== 'number') {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  }, [blockType, editor]);

  const handleUnOrderList = useCallback(() => {
    if (blockType !== 'bullet') {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  }, [blockType, editor]);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();

    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      let element =
        anchorNode.getKey() === 'root'
          ? anchorNode
          : $findMatchingParent(anchorNode, (e) => {
              const parent = e.getParent();
              return parent !== null && $isRootOrShadowRoot(parent);
            });

      if (element === null) {
        element = anchorNode.getTopLevelElementOrThrow();
      }

      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);

      if (elementDOM !== null) {
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType<ListNode>(
            anchorNode,
            ListNode,
          );
          const type = parentList
            ? parentList.getListType()
            : element.getListType();

          updateState({
            blockType: type,
          });
        } else {
          updateState({
            blockType: null,
          });
        }
      }

      updateState({
        isBold: selection.hasFormat('bold'),
        isItalic: selection.hasFormat('italic'),
        isUnderline: selection.hasFormat('underline'),
      });
    }
  }, [editor]);

  useEffect(() => {
    editor.getEditorState().read(() => {
      $updateToolbar();
    });
  }, [editor, $updateToolbar]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
    );
  }, [editor, $updateToolbar]);

  return (
    <div className="py-2 px-3 flex gap-3 items-center">
      <AddVariableDropdown />

      <Divider />

      <div className="flex gap-1">
        <ButtonItem
          isActive={isBold}
          onClick={handleBold}
          icon={<BoldOutlined />}
        />
        <ButtonItem
          isActive={isItalic}
          onClick={handleItalic}
          icon={<ItalicOutlined />}
        />
        <ButtonItem
          isActive={isUnderline}
          onClick={handleUnderline}
          icon={<UnderlineOutlined />}
        />
      </div>

      <Divider />

      <div className="flex gap-1">
        <ButtonItem
          onClick={handleOrderList}
          isActive={blockType === 'number'}
          icon={<OrderedListOutlined />}
        />
        <ButtonItem
          onClick={handleUnOrderList}
          isActive={blockType === 'bullet'}
          icon={<UnorderedListOutlined />}
        />
      </div>

      {/*<Divider />*/}

      {/*<div className="flex gap-1">*/}
      {/*  <Button type="text" shape="circle" icon={<LinkOutlined />} />*/}
      {/*</div>*/}
    </div>
  );
};

export default ToolbarPlugin;
