import { Form } from 'antd';
import { FormItemProps } from 'antd/es/form/FormItem';
import * as React from 'react';
import { FieldPath, FieldValues, UseControllerProps } from 'react-hook-form';

import useBaseController from './useBaseController';

interface FormControlProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> extends UseControllerProps<TFieldValues, TName>,
    Omit<FormItemProps, keyof UseControllerProps> {
  children: React.ReactElement;
}

const FormControl = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  name,
  children,
  rules,
  ...rest
}: FormControlProps<TFieldValues, TName>) => {
  const { fieldProps, showError, errorMessage, formState } = useBaseController({
    name,
    rules,
  });

  return (
    <Form.Item
      {...rest}
      validateStatus={showError ? 'error' : undefined}
      help={showError ? errorMessage : undefined}
    >
      {React.cloneElement(children, {
        ...fieldProps,
        disabled: formState.isSubmitting,
      })}
    </Form.Item>
  );
};

export default FormControl;
