import { PlusOutlined } from '@ant-design/icons';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { Button, Dropdown, MenuProps } from 'antd';
import { $createTextNode, $insertNodes } from 'lexical';
import React, { useMemo } from 'react';

import { usePluginContext } from '../../PluginContext.tsx';
import { $createVariableNode } from './VariableNode.tsx';

const AddVariableDropdown: React.FC = () => {
  const [editor] = useLexicalComposerContext();

  const { variablePlugin } = usePluginContext();

  const menuItems = useMemo(() => {
    return variablePlugin.data.map((item) => ({
      key: item.value,
      label: (
        <div className="flex items-center justify-between">
          <span>{item.label}</span>

          <span className="uppercase text-neutral-500 font-mono text-xs">{`{${item.value}}`}</span>
        </div>
      ),
      variable: item,
    }));
  }, [variablePlugin]);

  const handleSelect: MenuProps['onClick'] = ({ key }) => {
    const variable = variablePlugin.data.find((v) => v.value === key);

    if (variable) {
      editor.update(() => {
        const variableNode = $createVariableNode(
          variable.label,
          variable.value,
        );

        const emptyNode = $createTextNode(' ');

        $insertNodes([variableNode]);
        $insertNodes([emptyNode]);
      });
    }
  };

  return (
    <Dropdown
      trigger={['click']}
      menu={{
        items: menuItems,
        onClick: handleSelect,
      }}
      overlayStyle={{
        width: '280px',
      }}
    >
      <Button type="text" icon={<PlusOutlined />}>
        Add Variable
      </Button>
    </Dropdown>
  );
};

export default AddVariableDropdown;
