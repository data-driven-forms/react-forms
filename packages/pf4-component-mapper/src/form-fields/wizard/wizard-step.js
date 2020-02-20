import React, { Fragment } from 'react';
import { WizardBody } from '@patternfly/react-core/dist/js/components/Wizard/WizardBody';
import { Title } from '@patternfly/react-core/dist/js/components/Title/Title';
import PropTypes from 'prop-types';
import WizardStepButtons from './step-buttons';

export const RenderTitle = ({ title, customTitle }) => customTitle ? customTitle : <Title headingLevel="h1" size="xl">{title}</Title>;

RenderTitle.propTypes = {
  title: PropTypes.node,
  customTitle: PropTypes.node,
};

class WizardStep extends React.Component {
  formRef = React.createRef();
  componentDidUpdate(prevProps) {
    // we want to scroll to top of the new step so
    // the user experience won't suck. For instance,
    // when the first step contains many fields that you have to scroll down
    // to fill all the data for the next step. If the next step contains instructions
    // at the top, the user will miss them because the scrollbar offset will stay at
    // the same place it was.
    if(prevProps.stepKey !== this.props.stepKey) {
      // HACK: I can not pass ref to WizardBody because it is not
      // wrapped by forwardRef. However, the step body (the one that overflows)
      // is the grand parent of the form element.
      const stepBody = this.formRef.current && this.formRef.current.parentNode.parentNode;
      stepBody.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }
  }

  render() {
    const {
      title,
      description,
      fields,
      formOptions,
      showTitles,
      showTitle,
      customTitle,
      ...rest
    } = this.props;

    return (
      <Fragment>
        <WizardBody hasBodyPadding={true}>
          <div ref={this.formRef} className="pf-c-form">
            {((showTitles && showTitle !== false) || showTitle) && <RenderTitle title={title} customTitle={customTitle} />}
            {fields.map(item => formOptions.renderForm([item], formOptions))}
          </div>
        </WizardBody>
        <WizardStepButtons
          formOptions={formOptions}
          {...rest}
        />
      </Fragment>
    );
  }
}

WizardStep.propTypes = {
  title: PropTypes.node,
  description: PropTypes.node,
  fields: PropTypes.array.isRequired,
  formOptions: PropTypes.shape({
    renderForm: PropTypes.func.isRequired,
  }).isRequired,
  showTitles: PropTypes.bool,
  showTitle: PropTypes.bool,
  customTitle: PropTypes.node,
};

export default WizardStep;
