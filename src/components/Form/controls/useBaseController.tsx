import { useCallback, useMemo } from 'react';
import {
  ControllerRenderProps,
  FieldError,
  FieldPath,
  FieldValues,
  Message,
  useController,
  UseControllerProps,
  UseControllerReturn,
} from 'react-hook-form';

type ValuePropName = string;

type OnChangeReturn = (value: unknown, ...args: unknown[]) => void;

type FieldProp<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = ControllerRenderProps<TFieldValues, TName> & {
  onChange: OnChangeReturn;
};

export interface UseBaseControllerProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> extends UseControllerProps<TFieldValues, TName> {
  getValueFromEvent?: (e: unknown) => unknown;
  valuePropName?: ValuePropName;
  onChange?: (value: unknown, ...args: unknown[]) => boolean;
  shouldShowError?: boolean;
}

export interface UseBaseControllerReturn<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> extends UseControllerReturn<TFieldValues, TName> {
  fieldProps: FieldProp<TFieldValues, TName>;
  onChange: OnChangeReturn;
  fieldError?: FieldError;
  showError: boolean;
  errorMessage?: Message;
}

const identity = <T = unknown,>(v: T): T => v;

const useBaseController = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  name,
  control,
  defaultValue,
  getValueFromEvent,
  valuePropName = 'value',
  onChange,
  shouldShowError = true,
}: UseBaseControllerProps<TFieldValues, TName>): UseBaseControllerReturn<
  TFieldValues,
  TName
> => {
  const { field, fieldState, formState } = useController({
    name,
    control,
    defaultValue,
  });

  const showError = !!fieldState.error && shouldShowError;
  const fieldError = fieldState.error;
  const errorMessage = fieldError?.message;

  const handleChange = useCallback<OnChangeReturn>(
    (e: unknown, ...args: unknown[]) => {
      const value = (getValueFromEvent || identity)(e);

      if (onChange) {
        const shouldNotExecuteOriginalOnChange = onChange(value, ...args, {
          field,
          fieldState,
          formState,
        });

        if (shouldNotExecuteOriginalOnChange === true) {
          return null;
        }
      }

      field.onChange(value);
    },
    [getValueFromEvent, onChange, field, fieldState, formState],
  );

  const fieldProp = useMemo<FieldProp<TFieldValues, TName>>(() => {
    return {
      ...field,
      [valuePropName]: field.value,
      onChange: handleChange,
    };
  }, [field, handleChange, valuePropName]);

  return {
    field,
    fieldProps: fieldProp,
    fieldState,
    formState,
    onChange: handleChange,
    fieldError,
    showError,
    errorMessage,
  };
};

export default useBaseController;
