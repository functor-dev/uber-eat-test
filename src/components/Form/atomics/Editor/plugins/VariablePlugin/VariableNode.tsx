import {
  $applyNodeReplacement,
  DecoratorNode,
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  LexicalNode,
  NodeKey,
  SerializedLexicalNode,
  Spread,
} from 'lexical';

import VariableComponent from './VariableComponent';

function $convertVariableElement(
  domNode: HTMLElement,
): DOMConversionOutput | null {
  const value = domNode.getAttribute('data-lexical-variable-value');
  const label = domNode.getAttribute('data-lexical-variable-label');

  if (value && label) {
    const node = $createVariableNode(label, value);

    return {
      node,
    };
  }

  return null;
}

export type SerializedVariableNode = Spread<
  {
    label: string;
    value: string;
  },
  SerializedLexicalNode
>;

export class VariableNode extends DecoratorNode<JSX.Element> {
  __label: string;
  __value: string;

  static getType() {
    return 'VARIABLE';
  }

  static clone(node: VariableNode): VariableNode {
    return new VariableNode(node.__label, node.__value, node.__key);
  }

  static importJSON(serializedNode: SerializedVariableNode): VariableNode {
    return $createVariableNode(serializedNode.label, serializedNode.value);
  }

  static importDOM(): DOMConversionMap | null {
    return {
      span: (domNode: HTMLElement) => {
        if (!domNode.hasAttribute('data-lexical-variable')) {
          return null;
        }

        return {
          conversion: $convertVariableElement,
          priority: 1,
        };
      },
    };
  }

  constructor(label: string, value: string, key?: NodeKey) {
    super(key);

    this.__label = label;
    this.__value = value;
  }

  exportJSON(): SerializedVariableNode {
    return {
      type: 'VARIABLE',
      version: 1,
      label: this.__label,
      value: this.__value,
    };
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement('span');

    element.setAttribute('data-lexical-variable', 'true');
    element.setAttribute('data-lexical-variable-label', this.__label);
    element.setAttribute('data-lexical-variable-value', this.__value);

    element.classList.add(
      'border',
      'border-gray-300',
      'text-neutral-500',
      'font-mono',
      'rounded',
      'p-0.5',
      'uppercase',
    );

    element.textContent = `{${this.__value}}`;

    return {
      element,
    };
  }

  createDOM() {
    return document.createElement('span');
  }

  updateDOM() {
    return false;
  }

  decorate() {
    return (
      <VariableComponent
        label={this.__label}
        value={this.__value}
        nodeKey={this.__key}
      />
    );
  }
}
export function $createVariableNode(label: string, value: string) {
  return $applyNodeReplacement(new VariableNode(label, value));
}

export function $isVariableNode(
  node: LexicalNode | null | undefined,
): node is VariableNode {
  return node instanceof VariableNode;
}
