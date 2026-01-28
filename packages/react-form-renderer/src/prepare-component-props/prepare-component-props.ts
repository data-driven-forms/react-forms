import { ElementType } from 'react';
import ComponentMapper, { ExtendedMapperComponent } from '../common-types/component-mapper';
import { ActionMapper } from '../form-renderer/action-mapper';

interface ComponentProps {
  component: string;
  actions?: Record<string, any[]>;
  resolveProps?: (...args: any[]) => any;
  [key: string]: any;
}

interface PrepareComponentPropsInput {
  component: string;
  rest: Record<string, any>;
  componentMapper: ComponentMapper;
  actionMapper?: ActionMapper;
}

interface PrepareComponentPropsResult {
  componentProps: ComponentProps;
  overrideProps: Record<string, any>;
  mergedResolveProps?: (...args: any[]) => any;
  Component: ElementType<any>;
}

const isExtendedMapperComponent = (binding: any): binding is ExtendedMapperComponent => {
  return typeof binding === 'object' &&
         binding !== null &&
         Object.prototype.hasOwnProperty.call(binding, 'component');
};

const prepareComponentProps = ({
  component,
  rest,
  componentMapper,
  actionMapper
}: PrepareComponentPropsInput): PrepareComponentPropsResult => {
  let componentProps: ComponentProps = {
    component,
    ...rest,
  };

  const componentBinding = componentMapper[component];
  let Component: ElementType<any>;

  if (isExtendedMapperComponent(componentBinding)) {
    const { component: bindingComponent, ...mapperProps } = componentBinding;
    Component = bindingComponent;
    componentProps = {
      ...mapperProps,
      ...componentProps,
      // merge mapper and field actions
      ...(mapperProps.actions && rest.actions ? { actions: { ...mapperProps.actions, ...rest.actions } } : {}),
      // merge mapper and field resolveProps
      ...(mapperProps.resolveProps && rest.resolveProps
        ? {
            resolveProps: (...args: any[]) => ({
              ...mapperProps.resolveProps(...args),
              ...rest.resolveProps(...args),
            }),
          }
        : {}),
    };
  } else {
    Component = componentBinding;
  }

  /**
   * Map actions to props
   */
  let overrideProps: Record<string, any> = {};
  let mergedResolveProps: ((...args: any[]) => any) | undefined; // new object has to be created because of references

  if (componentProps.actions && actionMapper) {
    Object.keys(componentProps.actions).forEach((prop) => {
      const [action, ...args] = componentProps.actions![prop];
      overrideProps[prop] = actionMapper[action](...args);
    });

    // Merge componentProps resolve props and actions resolve props
    if (componentProps.resolveProps && overrideProps.resolveProps) {
      mergedResolveProps = (...args: any[]) => ({
        ...componentProps.resolveProps!(...args),
        ...overrideProps.resolveProps(...args),
      });
    }

    // do not pass actions object to components
    delete componentProps.actions;
  }

  return {
    componentProps,
    overrideProps,
    mergedResolveProps,
    Component,
  };
};

export default prepareComponentProps;