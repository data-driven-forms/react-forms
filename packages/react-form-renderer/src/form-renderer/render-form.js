import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {childrenPropTypes} from '@data-driven-forms/common/src/prop-types-templates';
import RendererContext from '../files/renderer-context';
import FormSpy from '../files/form-spy';

const FormFieldHideWrapper = ({hideField, children}) =>
  hideField ? <div hidden>{children}</div> : children;

FormFieldHideWrapper.propTypes = {
  hideField: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
};

FormFieldHideWrapper.defaultProps = {
  hideField: false,
};

//Helper function to read the top uiState from the uiState stack of the specified field
const checkUIState = ({fieldName, uiState}) => {
  const fieldState = uiState.fields[fieldName];
  if (!fieldState) return {visible: true, disabled: false};

  //If no visibility information exists, default to visible=true
  //Else use info from the first met condition in the uiState stack for this field
  const visible = !fieldState.visible ? true : fieldState.visible[0].value;

  //Disabled defaults to false if no explicit information exists
  const disabled = !fieldState.disabled ? false : fieldState.disabled[0].value;

  return {visible, disabled};
};

const SingleField = ({component, name, ...rest}) => {
  const {
    componentMapper,
    formOptions: {uiState},
  } = useContext(RendererContext);

  const fieldState = checkUIState({fieldName: name, uiState});

  let componentProps = {
    component,
    name,
    disabled: fieldState.disabled,
    ...rest,
  };

  const componentBinding = componentMapper[component];
  let Component;
  if (
    typeof componentBinding === 'object' &&
    Object.prototype.hasOwnProperty.call(componentBinding, 'component')
  ) {
    const {component, ...mapperProps} = componentBinding;
    Component = component;
    componentProps = {...mapperProps, ...componentProps};
  } else {
    Component = componentBinding;
  }

  return (
    <FormFieldHideWrapper hideField={!fieldState.visible}>
      <Component {...componentProps} />
    </FormFieldHideWrapper>
  );
};

SingleField.propTypes = {
  component: PropTypes.string.isRequired,
  condition: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  hideField: PropTypes.bool,
  dataType: PropTypes.string,
  validate: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object])),
  initialValue: PropTypes.any,
};

const renderForm = fields =>
  fields.map(field =>
    Array.isArray(field) ? renderForm(field) : <SingleField key={field.name} {...field} />
  );

export default renderForm;
