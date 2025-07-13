import React from 'react';

export type QueryStatus = 'pending' | 'success' | 'error';

export interface VariableItem {
  label: string;
  value: string;
}

export interface PluginState {
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  blockType: 'number' | 'bullet' | 'check' | null;
  variablePlugin: {
    data: VariableItem[];
    status: QueryStatus;
  };
}

export interface PluginContextProps extends PluginState {
  updateState(state: Partial<PluginState>): void;
}

const PluginContext = React.createContext<PluginContextProps>({
  isBold: false,
  isItalic: false,
  isUnderline: false,
  blockType: null,
  updateState: () => null,
  variablePlugin: {
    data: [],
    status: null as unknown as QueryStatus,
  },
});

export const usePluginContext = () => {
  return React.useContext(PluginContext);
};

export default PluginContext;
