const prepareComponentProps = ({ component, rest, componentMapper, actionMapper }) => {
  let componentProps = {
    component,
    ...rest,
  };

  const componentBinding = componentMapper[component];
  let Component;
  if (typeof componentBinding === 'object' && Object.prototype.hasOwnProperty.call(componentBinding, 'component')) {
    const { component, ...mapperProps } = componentBinding;
    Component = component;
    componentProps = {
      ...mapperProps,
      ...componentProps,
      // merge mapper and field actions
      ...(mapperProps.actions && rest.actions ? { actions: { ...mapperProps.actions, ...rest.actions } } : {}),
      // merge mapper and field resolveProps
      ...(mapperProps.resolveProps && rest.resolveProps
        ? {
            resolveProps: (...args) => ({
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
  let overrideProps = {};
  let mergedResolveProps; // new object has to be created because of references
  if (componentProps.actions) {
    Object.keys(componentProps.actions).forEach((prop) => {
      const [action, ...args] = componentProps.actions[prop];
      overrideProps[prop] = actionMapper[action](...args);
    });

    // Merge componentProps resolve props and actions resolve props
    if (componentProps.resolveProps && overrideProps.resolveProps) {
      mergedResolveProps = (...args) => ({
        ...componentProps.resolveProps(...args),
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
