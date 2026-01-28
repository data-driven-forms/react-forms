import arrayMutators from 'final-form-arrays';
import createFocusDecorator from 'final-form-focus';
import React, { useCallback, useMemo, useRef, useState, cloneElement, ReactNode, ComponentType, FunctionComponent, ReactElement } from 'react';
import { FormProps } from 'react-final-form';
import { FormApi } from 'final-form';

import defaultSchemaValidator from '../default-schema-validator';
import defaultValidatorMapper from '../validator-mapper';
import Form from '../form';
import RendererContext from '../renderer-context';
import renderForm from './render-form';
import SchemaErrorComponent from './schema-error-component';
import Schema from '../common-types/schema';
import ComponentMapper from '../common-types/component-mapper';
import { ValidatorMapper } from '../validator-mapper';
import { ActionMapper } from './action-mapper';
import SchemaValidatorMapper from '../common-types/schema-validator-mapper';
import { FormTemplateRenderProps } from '../common-types/form-template-render-props';
import { NoIndex } from '../common-types/no-index';
import { ConditionMapper } from './condition-mapper';

export interface FormRendererProps<
  FormValues = Record<string, any>,
  InitialFormValues = Partial<FormValues>,
  FormTemplateProps extends FormTemplateRenderProps = FormTemplateRenderProps
> extends Omit<NoIndex<FormProps<FormValues, InitialFormValues>>, 'onSubmit' | 'children'> {
  initialValues?: InitialFormValues;
  onCancel?: (values: FormValues, ...args: any[]) => void;
  onReset?: () => void;
  onError?: (...args: any[]) => void;
  onSubmit?: FormProps<FormValues, InitialFormValues>['onSubmit'];
  schema: Schema;
  clearOnUnmount?: boolean;
  clearedValue?: any;
  componentMapper: ComponentMapper;
  FormTemplate?: ComponentType<FormTemplateProps> | FunctionComponent<FormTemplateProps>;
  validatorMapper?: ValidatorMapper;
  actionMapper?: ActionMapper;
  conditionMapper?: ConditionMapper;
  schemaValidatorMapper?: SchemaValidatorMapper;
  FormTemplateProps?: Partial<FormTemplateProps>;
  children?: ReactNode | ((props: FormTemplateRenderProps) => ReactNode);
}

const isFunc = (fn: any): fn is Function => typeof fn === 'function';

const renderChildren = (children: ReactNode | ((props: Record<string, any>) => ReactNode), props: Record<string, any>): ReactNode => {
  if (isFunc(children)) {
    return children(props);
  }

  let childElement = children;
  if (Array.isArray(children)) {
    /**
     * Only permit one child element
     */
    if (children.length !== 1) {
      throw new Error('FormRenderer expects only one child element!');
    }

    childElement = children[0];
  }

  if (React.isValidElement(childElement)) {
    /**
     * Clone react element, pass form fields and schema as props, but override them with child props if present
     */
    const childProps = childElement.props && typeof childElement.props === 'object' ? childElement.props : {};
    return cloneElement(childElement, { ...props, ...childProps });
  }

  if (typeof childElement === 'object' && childElement !== null) {
    throw new Error('Invalid React element passed as child!');
  }

  if (childElement === null || childElement === undefined) {
    return null;
  }

  throw new Error(`Invalid children prop! Expected one of [null, Function, object], got ${typeof children}`);
};

function FormRenderer<
  FormValues = Record<string, any>,
  InitialFormValues = Partial<FormValues>,
  FormTemplateProps extends FormTemplateRenderProps = FormTemplateRenderProps
>({
  actionMapper,
  children,
  clearedValue,
  clearOnUnmount = false,
  componentMapper,
  conditionMapper = {},
  decorators,
  FormTemplate,
  FormTemplateProps,
  mutators,
  onCancel,
  onError,
  onReset,
  onSubmit,
  schema,
  schemaValidatorMapper,
  subscription,
  validatorMapper,
  initialValues = {} as InitialFormValues,
  ...props
}: FormRendererProps<FormValues, InitialFormValues, FormTemplateProps>): ReactElement<any, any> {
  const [fileInputs, setFileInputs] = useState<string[]>([]);
  const formFields = useMemo(() => renderForm(schema.fields), [schema]);
  const registeredFields = useRef<Record<string, number>>({});
  const focusDecorator = useRef(createFocusDecorator());
  const validatorMapperMerged = useMemo(() => {
    return { ...defaultValidatorMapper, ...validatorMapper };
  }, [validatorMapper]);
  const mutatorsMerged = useMemo(() => ({ ...arrayMutators, ...mutators }), [mutators]);
  const decoratorsMerged = useMemo(() => [focusDecorator.current, ...(Array.isArray(decorators) ? decorators : [])], [decorators]);

  const handleSubmitCallback = useCallback(
    (values: FormValues, formApi: FormApi<FormValues>, ...args: any[]) => {
      const extendedFormApi = {
        ...formApi,
        fileInputs
      } as FormApi<FormValues, InitialFormValues> & { fileInputs: string[] };
      return !isFunc(onSubmit) ? undefined : onSubmit(values, extendedFormApi, ...args);
    },
    [onSubmit, fileInputs]
  );

  const handleCancelCallback = useCallback(
    (getState: () => any) => {
      return (...args: any[]) => onCancel?.(getState().values, ...args);
    },
    [onCancel]
  );

  const handleResetCallback = useCallback(
    (reset: () => void) =>
      (...args: any[]) => {
        reset();
        return !isFunc(onReset) ? void 0 : onReset();
      },
    [onReset]
  );

  const handleErrorCallback = useCallback(
    (...args: any[]) => {
      // eslint-disable-next-line no-console
      console.error(...args);
      return !isFunc(onError) ? void 0 : onError(...args);
    },
    [onError]
  );

  const registerInputFile = useCallback((name: string) => {
    setFileInputs((prevFiles) => [...prevFiles, name]);
  }, []);

  const unRegisterInputFile = useCallback((name: string) => {
    setFileInputs((prevFiles) => prevFiles.filter(file => file !== name));
  }, []);

  const setRegisteredFields = useCallback((fn: (prev: Record<string, number>) => Record<string, number>) => {
    return (registeredFields.current = fn({ ...registeredFields.current }));
  }, []);

  const internalRegisterField = useCallback((name: string) => {
    setRegisteredFields((prev) => (prev[name] ? { ...prev, [name]: prev[name] + 1 } : { ...prev, [name]: 1 }));
  }, [setRegisteredFields]);

  const internalUnRegisterField = useCallback((name: string) => {
    setRegisteredFields(({ [name]: currentField, ...prev }) => (currentField && currentField > 1 ? { [name]: currentField - 1, ...prev } : prev));
  }, [setRegisteredFields]);

  const internalGetRegisteredFields = useCallback(() => {
    const fields = registeredFields.current;
    return Object.entries(fields).reduce((acc: string[], [name, value]) => (value > 0 ? [...acc, name] : acc), []);
  }, []);

  try {
    const validatorTypes = Object.keys(validatorMapperMerged);
    const actionTypes = actionMapper ? Object.keys(actionMapper) : [];

    defaultSchemaValidator(schema, componentMapper, validatorTypes, actionTypes, schemaValidatorMapper);
  } catch (error: any) {
    handleErrorCallback('schema-error', error);
    return <SchemaErrorComponent name={error.name} message={error.message} />;
  }

  return (
    <Form
      onSubmit={handleSubmitCallback}
      mutators={mutatorsMerged}
      decorators={decoratorsMerged}
      subscription={{ pristine: true, submitting: true, valid: true, ...subscription }}
      render={({ handleSubmit, pristine, valid, form: { reset, mutators, getState, submit, ...form } }) => (
        <RendererContext.Provider
          value={{
            componentMapper,
            validatorMapper: validatorMapperMerged,
            actionMapper,
            conditionMapper,
            formOptions: {
              registerInputFile,
              unRegisterInputFile,
              pristine,
              onSubmit,
              onCancel: isFunc(onCancel) ? handleCancelCallback(getState) : undefined,
              onReset: handleResetCallback(reset),
              onError: handleErrorCallback,
              getState,
              valid,
              clearedValue,
              submit,
              handleSubmit,
              reset,
              clearOnUnmount,
              renderForm,
              internalRegisterField,
              internalUnRegisterField,
              mutators,
              ...mutators,
              ...form,
              ffGetRegisteredFields: form.getRegisteredFields,
              getRegisteredFields: internalGetRegisteredFields,
              initialValues,
              schema,
            },
          }}
        >
          {FormTemplate && <FormTemplate {...({ formFields, schema, ...FormTemplateProps } as FormTemplateProps)} />}

          {children && renderChildren(children, { formFields, schema })}
        </RendererContext.Provider>
      )}
      {...props}
      initialValues={initialValues}
    />
  );
}

export default FormRenderer;