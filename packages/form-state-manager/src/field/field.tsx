import React from 'react';
import AnyObject from '../any-object';
import useField, { UseFieldConfig } from '../use-field';

export interface FieldProps extends UseFieldConfig {
  children: (props: AnyObject) => React.ReactNode;
  component: React.ComponentType<AnyObject> | 'input' | 'select' | 'textarea';
  ref: React.Ref<any>;
  render: (props: AnyObject) => React.ReactNode;
}

const Field = React.forwardRef(
  ({ children, render, component, ...props }: FieldProps, ref): React.ReactElement => {
    const fieldProps = useField(props);

    if (typeof component === 'string') {
      const { meta, input, ...rest } = fieldProps;

      return React.createElement(
        component,
        {
          ...input,
          ...rest,
          ref
        },
        children
      );
    }

    if (component) {
      const Component = component;
      return <Component {...fieldProps} />;
    }

    if (render) {
      return render(fieldProps) as React.ReactElement;
    }

    return children(fieldProps) as React.ReactElement;
  }
);

export default Field;
