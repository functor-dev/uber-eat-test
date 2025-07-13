import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useLexicalNodeSelection } from '@lexical/react/useLexicalNodeSelection';
import { mergeRegister } from '@lexical/utils';
import { Tooltip } from 'antd';
import clsx from 'clsx';
import { CLICK_COMMAND, COMMAND_PRIORITY_LOW } from 'lexical';
import React, { useEffect, useRef } from 'react';

interface VariableComponentProps {
  label: string;
  value: string;
  nodeKey: string;
}

const VariableComponent: React.FC<VariableComponentProps> = ({
  label,
  value,
  nodeKey,
}) => {
  const variableRef = useRef<HTMLElement>(null);

  const [editor] = useLexicalComposerContext();

  const [isSelected, setSelected, clearSelection] =
    useLexicalNodeSelection(nodeKey);

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand<MouseEvent>(
        CLICK_COMMAND,
        (payload) => {
          const event = payload;
          if (event.target === variableRef.current) {
            if (event.shiftKey) {
              setSelected(!isSelected);
            } else {
              clearSelection();
              setSelected(true);
            }
            return true;
          }

          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
    );
  }, []);

  return (
    <Tooltip title={label}>
      <span
        ref={variableRef}
        onClick={() => setSelected(!isSelected)}
        className={clsx(
          'border border-gray-200 text-neutral-500 font-mono rounded p-0.5 uppercase',
          {
            'outline outline-blue-500': isSelected,
          },
        )}
      >
        {`{${value}}`}
      </span>
    </Tooltip>
  );
};

export default VariableComponent;
