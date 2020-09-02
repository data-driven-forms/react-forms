import { FormEvent } from 'react';

import set from 'lodash/set';
import get from 'lodash/get';
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
import omit from 'lodash/omit';
import isEmpty from 'lodash/isEmpty';

import composeValidators from '../files/compose-validators';
import CreateManagerApi, {
  ManagerState,
  ManagerApi,
  AsyncWatcher,
  AsyncWatcherRecord,
  FieldState,
  Callback,
  SubscriberConfig,
  ManagerApiFunctions,
  ExtendedFieldState,
  InitilizeInputFunction,
  CreateManagerApiConfig
} from '../types/manager-api';
import AnyObject from '../types/any-object';
import FieldConfig, { IsEqual } from '../types/field-config';
import { Meta } from '../types/use-field';
import { formLevelValidator, isPromise } from './validate';
import { FormValidator, FormLevelError, Validator } from '../types/validate';

export const defaultIsEqual = (a: any, b: any) => a === b;

const isLast = (fieldListeners: AnyObject, name: string) => fieldListeners?.[name]?.count === 1;

const noState = (fieldListeners: AnyObject, name: string) => !fieldListeners?.[name]?.state;

const addIfUnique = (array: Array<string>, item: string) => !array.includes(item) && array.push(item);

export const shouldExecute = (formLevel: boolean | undefined, fieldLevel: boolean | undefined): boolean =>
  Boolean((formLevel || fieldLevel) && fieldLevel !== false);

type objectMapFunction = (value: any, key: any) => any;

// TODO: try to optimize
const traverseObject = (object: AnyObject, callback: objectMapFunction) => Object.keys(object).forEach((key) => callback(object[key], key));

const asyncWatcher: AsyncWatcher = (updateValidating, updateSubmitting) => {
  let nextKey = 0;
  const asyncValidators: AsyncWatcherRecord = {};
  // const asyncSubmissions: AsyncWatcherRecord = {};

  const resolveValidator = (resolveKey: number): void => {
    delete asyncValidators[resolveKey];
    updateValidating(Object.keys(asyncValidators).length !== 0);
  };

  const registerValidator = (callback: Promise<unknown>) => {
    const resolveKey = nextKey;
    asyncValidators[nextKey] = callback;
    updateValidating(Object.keys(asyncValidators).length !== 0);
    callback.then(() => resolveValidator(resolveKey)).catch(() => resolveValidator(resolveKey));
    nextKey = nextKey + 1;
  };

  return {
    registerValidator
  };
};

export function flatObject(obj: AnyObject): AnyObject {
  const flatObject: AnyObject = {};
  const path: Array<string> = [];
  const mark = '<REMOVE';

  // remove only .[ combinations that was inserted from this parser, not from custom names
  const removeMark = (str: string) => str.replace(new RegExp(`.${mark}`, 'g'), '');

  function dig(obj: AnyObject) {
    if (Array.isArray(obj)) {
      return obj.forEach((field, index) => {
        path.push(`${mark}[${index}]`);
        dig(field);
        path.pop();
      });
    }

    if (typeof obj !== 'object') {
      return (flatObject[removeMark(path.join('.'))] = obj);
    }

    for (const key in obj) {
      path.push(key);
      dig(obj[key]);
      path.pop();
    }
  }

  dig(obj);
  return flatObject;
}

export function unFlatObject(obj: AnyObject): AnyObject {
  const nestedStructure = {};
  Object.entries(obj).forEach(([key, value]) => {
    set(nestedStructure, key, value);
  });

  return nestedStructure;
}

export const removeEmpty = (obj: AnyObject): AnyObject => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === 'object') {
      if (isEmpty(obj[key])) {
        delete obj[key];
      } else {
        removeEmpty(obj[key]);
      }
    } else if (typeof obj[key] === 'undefined') {
      delete obj[key];
    }
  });
  return obj;
};

export const initialMeta = (initial: any): Meta => ({
  active: false,
  data: {},
  dirty: false,
  dirtySinceLastSubmit: false,
  error: undefined,
  initial,
  invalid: false,
  modified: false,
  modifiedSinceLastSubmit: false,
  pristine: true,
  submitError: undefined,
  submitFailed: false,
  submitSucceeded: false,
  submitting: false,
  touched: false,
  valid: true,
  validating: false,
  visited: false
});

export const createField = (name: string, value: any): FieldState => ({
  name,
  value,
  meta: initialMeta(value)
});

export const initialFormState = (initialValues: AnyObject = {}): Omit<ManagerState, ManagerApiFunctions | 'destroyOnUnregister'> => ({
  values: cloneDeep(initialValues),
  errors: {},
  pristine: true,
  registeredFields: [],
  fieldListeners: {},
  active: undefined,
  dirty: false,
  dirtyFields: {},
  dirtyFieldsSinceLastSubmit: {},
  dirtySinceLastSubmit: false,
  error: undefined,
  hasSubmitErrors: false,
  hasValidationErrors: false,
  initialValues,
  invalid: false,
  modified: {},
  modifiedSinceLastSubmit: false,
  submitError: undefined,
  submitErrors: undefined,
  submitFailed: false,
  submitSucceeded: false,
  submitting: false,
  touched: {},
  valid: true,
  validating: false,
  visited: {}
});

const createManagerApi: CreateManagerApi = ({
  onSubmit,
  clearOnUnmount,
  initializeOnMount,
  validate,
  subscription,
  initialValues,
  debug,
  keepDirtyOnReinitialize,
  destroyOnUnregister
}) => {
  const config: CreateManagerApiConfig = {
    onSubmit,
    clearOnUnmount,
    initializeOnMount,
    validate,
    subscription,
    debug,
    keepDirtyOnReinitialize,
    destroyOnUnregister
  };

  let state: ManagerState = {
    change,
    focus,
    blur,
    handleSubmit,
    submit: handleSubmit,
    registerField,
    unregisterField,
    getState,
    getFieldValue,
    getFieldState,
    setFieldState,
    registerAsyncValidator,
    updateError,
    updateValid,
    rerender,
    batch,
    subscribe,
    unsubscribe,
    reset,
    restart: () => reset(),
    resetFieldState,
    initialize,
    isValidationPaused,
    pauseValidation,
    resumeValidation,
    setConfig,
    destroyOnUnregister,
    ...initialFormState(initialValues)
  };
  let inBatch = 0;
  let batched: Array<string> = [];
  let shouldRerender = false;
  let validationPaused = false;
  let runFormValidation = false;
  let revalidatedFields: Array<string> = [];

  const asyncWatcherApi = asyncWatcher(updateValidating, updateSubmitting);

  const managerApi: ManagerApi = () => state;

  function setConfig(attribute: keyof CreateManagerApiConfig, value: any) {
    config[attribute] = value;
  }

  function isValidationPaused() {
    return validationPaused;
  }

  function pauseValidation() {
    validationPaused = true;
  }

  function resumeValidation() {
    validationPaused = false;

    if (revalidatedFields.length > 0) {
      revalidateFields(revalidatedFields);
      revalidatedFields = [];
    }

    if (runFormValidation && config.validate) {
      validateForm(config.validate);
    }

    runFormValidation = false;
  }

  function handleFieldError(name: string, isValid: boolean, error: string | undefined = undefined) {
    setFieldState(name, (prev: FieldState) => ({
      ...prev,
      meta: {
        ...prev.meta,
        error,
        valid: isValid,
        invalid: !isValid,
        validating: false
      }
    }));

    updateError(name, isValid ? undefined : error);
  }

  async function validateField(name: string, value: any) {
    if (validationPaused) {
      addIfUnique(revalidatedFields, name);
      return undefined;
    }

    // TODO Memoize validation results
    if (Object.prototype.hasOwnProperty.call(state.fieldListeners, name)) {
      const listener = state.fieldListeners[name].asyncWatcher;
      const validators = Object.values(state.fieldListeners[name].fields)
        .map(({ validate }) => validate)
        .filter((validator) => validator !== undefined);

      if (validators.length > 0) {
        const result = composeValidators(validators as Validator[])(value, state.values);
        if (isPromise(result)) {
          (result as Promise<string | undefined>)
            .then(() => handleFieldError(name, true))
            .catch((response) => handleFieldError(name, false, response as string | undefined));
          listener.registerValidator(result as Promise<string | undefined>);
        } else {
          handleFieldError(name, !result, result as string | undefined);
        }
      }
    }
  }

  function reset(resetInitialValues?: AnyObject) {
    state = {
      ...state,
      ...initialFormState(resetInitialValues || initialValues),
      fieldListeners: state.fieldListeners,
      registeredFields: state.registeredFields
    };

    state.registeredFields.forEach(resetFieldState);
  }

  function initialize(initialValues: AnyObject | InitilizeInputFunction) {
    state.pristine = true;

    const convertedValues = typeof initialValues === 'function' ? initialValues(state.values) : initialValues;
    let clonedValues = cloneDeep(convertedValues);
    let dirtyFields = config.keepDirtyOnReinitialize ? cloneDeep(state.values) : {};

    if (config.keepDirtyOnReinitialize) {
      traverseObject(flatObject(dirtyFields), (value, name) => {
        if (!state.dirtyFields[name]) {
          dirtyFields = omit(dirtyFields, name);
        }
      });
    }

    traverseObject(flatObject(convertedValues), (value, key) => {
      const fieldState = state.fieldListeners[key]?.state;

      if (fieldState) {
        if (config.keepDirtyOnReinitialize) {
          if (!state.dirtyFields[key]) {
            fieldState.meta.pristine = true;
            fieldState.meta.dirty = false;
            fieldState.value = value;

            state.dirtyFields[key] = fieldState.meta.dirty;
          } else {
            clonedValues = omit(clonedValues, key);
          }
        } else {
          fieldState.meta.pristine = true;
          fieldState.meta.dirty = false;
          fieldState.value = value;

          state.dirtyFields[key] = fieldState.meta.dirty;
        }
      }
    });

    state.initialValues = initialValues;

    state.values = merge(removeEmpty(clonedValues), dirtyFields);
  }

  function validateForm(validate: FormValidator) {
    if (validationPaused) {
      runFormValidation = true;
      return undefined;
    }

    const result = formLevelValidator(validate, state.values, managerApi);
    const currentInvalidFields = Object.keys(state.errors);
    if (isPromise(result)) {
      const asyncResult = result as Promise<FormLevelError>;
      return asyncResult
        .then(() => {
          if (!state.validating) {
            state.errors = {};
            state.valid = true;
            state.invalid = false;
            state.error = undefined;
            revalidateFields(currentInvalidFields);
          }
        })
        .catch((errors) => {
          state.errors = errors;
          state.valid = false;
          state.invalid = true;
        });
    }

    const syncError = result as FormLevelError | undefined;
    if (syncError) {
      Object.keys(syncError).forEach((name) => {
        handleFieldError(name, false, syncError[name]);
      });
      state.errors = syncError;
      state.valid = false;
      state.invalid = true;
    } else {
      state.errors = {};
      state.valid = true;
      state.invalid = false;
      state.error = undefined;
      /**
       * Fields have to be revalidated on field level to synchronize the form and field errors
       */
      revalidateFields(currentInvalidFields);
    }
  }

  function revalidateFields(fields: string[]) {
    fields.forEach((name) => {
      validateField(name, get(state.values, name));
    });
  }

  function change(name: string, value?: any): void {
    set(state.values, name, value);
    state.visited[name] = true;
    state.modified[name] = true;
    state.modifiedSinceLastSubmit = true;
    state.dirtySinceLastSubmit = true;
    state.dirtyFields[name] = true;
    state.dirtyFieldsSinceLastSubmit[name] = true;

    // TODO modify all affected field state variables
    batch(() => {
      const allIsEqual: Array<IsEqual> = state.fieldListeners[name]
        ? Object.values(state.fieldListeners[name].fields)
            .map(({ isEqual }) => isEqual as IsEqual, [])
            .filter(Boolean)
        : [];

      const isEqualFn =
        allIsEqual.length > 0 ? (a: any, b: any) => allIsEqual.reduce((acc: boolean, curr: IsEqual) => acc && curr(a, b), true) : defaultIsEqual;

      const pristine = isEqualFn(value, state.fieldListeners[name]?.state?.meta?.initial || get(state.initialValues, name));

      setFieldState(name, (prevState) => ({
        ...prevState,
        meta: {
          ...prevState.meta,
          pristine,
          dirty: !pristine
        },
        value
      }));
      state.pristine = false;
      state.dirty = true;

      revalidateFields([name, ...(state.fieldListeners[name]?.validateFields || state.registeredFields.filter((n) => n !== name))]);

      if (config.validate) {
        validateForm(config.validate);
      }
    });
  }

  function focus(name: string): void {
    state.active = name;
    setFieldState(name, (prevState) => ({ ...prevState, meta: { ...prevState.meta, active: true } }));
  }

  function blur(name: string): void {
    if (state.active === name) {
      state.active = undefined;
    }

    setFieldState(name, (prevState) => ({ ...prevState, meta: { ...prevState.meta, active: false } }));
  }

  function handleSubmit(event?: FormEvent): void {
    event && event.preventDefault && event.preventDefault();

    let error = false;
    state.registeredFields.forEach((name) =>
      traverseObject(state.fieldListeners[name].fields, (field) => {
        error = error || (field.beforeSubmit && field.beforeSubmit() === false);
      })
    );

    if (error) {
      return;
    }

    config.onSubmit(state.values);

    state.registeredFields.forEach((name) =>
      traverseObject(state.fieldListeners[name].fields, (field) => {
        field.afterSubmit && field.afterSubmit();
      })
    );
  }

  function isInitialized(name: string): boolean {
    return Object.prototype.hasOwnProperty.call(state.fieldListeners, name);
  }

  function registerField(field: FieldConfig): void {
    addIfUnique(state.registeredFields, field.name);

    if (
      shouldExecute(config.initializeOnMount, field.initializeOnMount) ||
      (!isInitialized(field.name) && typeof field.initialValue !== 'undefined')
    ) {
      set(state.values, field.name, field.initialValue || get(state.initialValues, field.name));
    }

    let setDirty = false;
    if (!isInitialized(field.name) && typeof field.defaultValue !== 'undefined' && typeof get(state.values, field.name) === 'undefined') {
      set(state.values, field.name, field.defaultValue);
      setDirty = true;
    }

    subscribe(field as SubscriberConfig, true);

    if (state.fieldListeners[field.name]?.count === 1) {
      const updateFieldValidating = (validating: boolean) => {
        state.fieldListeners[field.name].state.meta.validating = validating;
      };

      const fieldAsyncWatcher = asyncWatcher(updateFieldValidating, () => undefined);
      state.fieldListeners[field.name].asyncWatcher = fieldAsyncWatcher;
    }

    if (field.data) {
      merge(state.fieldListeners[field.name].state.meta.data, field.data);
    }

    if (setDirty) {
      state.pristine = false;
      state.dirty = true;
      state.dirtyFields[field.name] = true;
      state.fieldListeners[field.name].state.meta.dirty = true;
      state.fieldListeners[field.name].state.meta.pristine = false;
    }

    revalidateFields([field.name, ...(state.fieldListeners[field.name]?.validateFields || state.registeredFields.filter((n) => n !== field.name))]);

    if (config.validate) {
      validateForm(config.validate);
    }
  }

  function unregisterField(field: Omit<FieldConfig, 'render'>): void {
    delete state.fieldListeners[field.name].fields[field.internalId];

    if (isLast(state.fieldListeners, field.name)) {
      state.registeredFields = state.registeredFields.filter((fieldName: string) => fieldName !== field.name);
      if (shouldExecute(config.clearOnUnmount || config.destroyOnUnregister, field.clearOnUnmount)) {
        set(state.values, field.name, field.value);
      }
    }

    unsubscribe(field as SubscriberConfig);
  }

  function setFieldState(name: string, mutateState: (prevState: FieldState) => FieldState): void {
    if (state.fieldListeners[name]) {
      const newState = mutateState(state.fieldListeners[name].state);
      state.fieldListeners[name].state = newState;
      Object.values(state.fieldListeners[name].fields).forEach(({ render }) => render());
    }
  }

  function getFieldValue(name: string): any {
    return get(state.values, name);
  }

  function getFieldState(name: string): ExtendedFieldState | undefined {
    if (state.fieldListeners[name]) {
      return {
        ...state.fieldListeners[name].state,
        ...state.fieldListeners[name].state.meta,
        change: (value: any) => change(name, value),
        blur: () => change(name),
        focus: () => change(name)
      };
    }
  }

  function getState(): ManagerState {
    return state;
  }

  function updateValidating(validating: boolean) {
    state.validating = validating;
  }

  function updateSubmitting(submitting: boolean) {
    state.submitting = submitting;
  }

  function updateError(name: string, error: string | undefined = undefined): void {
    if (error) {
      state.errors[name] = error;
      state.valid = false;
      state.invalid = true;
    } else {
      delete state.errors[name];
    }

    if (Object.keys(state.errors).length === 0) {
      state.valid = true;
      state.invalid = false;
    }
  }

  function registerAsyncValidator(validator: Promise<unknown>) {
    asyncWatcherApi.registerValidator(validator);
  }

  function updateValid(valid: boolean) {
    state.valid = valid;
    state.invalid = !valid;
  }

  function rerender(subscribeTo?: Array<string>) {
    if (inBatch > 0) {
      subscribeTo && subscribeTo.forEach((to) => addIfUnique(batched, to));
      shouldRerender = true;
    } else {
      traverseObject(state.fieldListeners, (fieldListener) => {
        traverseObject(fieldListener.fields, (field) => {
          let shouldRender: boolean | undefined = false;

          const mergedSubscription = { ...config.subscription, ...field.subscription };

          if (!config.subscription && !field.subscription) {
            shouldRender = true;
          } else {
            traverseObject(mergedSubscription, (subscribed, key) => {
              if (!shouldRender) {
                shouldRender = subscribed && subscribeTo?.includes(key);
              }
            });
          }

          shouldRender && field.render();
        });
      });
    }

    config.debug && config.debug(state);
  }

  function batch(callback: Callback): void {
    inBatch = inBatch + 1;
    callback();
    inBatch = inBatch - 1;
    if (inBatch === 0) {
      shouldRerender && rerender(batched);
      batched = [];
      shouldRerender = false;
    }
  }

  function subscribe(subscriberConfig: SubscriberConfig, isField?: boolean): void {
    state.fieldListeners[subscriberConfig.name] = {
      ...state.fieldListeners[subscriberConfig.name],
      ...(isField
        ? {
            state:
              state.fieldListeners[subscriberConfig.name]?.state ||
              createField(String(subscriberConfig.name), get(state.values, subscriberConfig.name))
          }
        : {}),
      count: (state.fieldListeners[subscriberConfig.name]?.count || 0) + 1,
      validateFields: subscriberConfig.validateFields,
      fields: {
        ...state.fieldListeners[subscriberConfig.name]?.fields,
        [subscriberConfig.internalId || subscriberConfig.name]: {
          validate: subscriberConfig.validate,
          render: subscriberConfig.render,
          subscription: subscriberConfig.subscription,
          afterSubmit: subscriberConfig.afterSubmit,
          beforeSubmit: subscriberConfig.beforeSubmit,
          isEqual: subscriberConfig.isEqual
        }
      }
    };
  }

  function unsubscribe(subscriberConfig: Omit<SubscriberConfig, 'render'>): void {
    if (isLast(state.fieldListeners, String(subscriberConfig.name)) && noState(state.fieldListeners, String(subscriberConfig.name))) {
      delete state.fieldListeners[subscriberConfig.name];
    } else {
      state.fieldListeners[subscriberConfig.name].count = state.fieldListeners[subscriberConfig.name].count - 1;
      delete state.fieldListeners[subscriberConfig.name].fields[subscriberConfig.internalId || subscriberConfig.name];
    }
  }

  function resetFieldState(name: string): void {
    // TODO: have initialValue and initialValues in one place
    const initialValue = get(state.initialValues, name) || state.fieldListeners[name].state.meta.initial;
    state.fieldListeners[name].state = createField(name, initialValue);

    set(state.values, name, initialValue);
    state.visited[name] = false;
    state.modified[name] = false;
    state.dirtyFields[name] = false;
    state.dirtyFieldsSinceLastSubmit[name] = false;
  }

  return managerApi;
};

export default createManagerApi;
