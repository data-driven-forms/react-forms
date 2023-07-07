import React from 'react';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FormRenderer, componentTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';
import * as enterHandle from '@data-driven-forms/common/wizard/enter-handler';

import { componentMapper, FormTemplate } from '../../index';
import reducer from '../../wizard/wizard-components/reducer';
import commonReducer from '@data-driven-forms/common/src/wizard/reducer';

describe('<Wizard />', () => {
  let initialProps;
  let schema;
  let nestedSchema;
  let initialValues;
  let schemaWithHeader;
  let Title;
  let Description;
  let initialValuesNestedSchema;

  beforeEach(() => {
    initialValues = {
      'foo-field': 'foo-field-value',
      'bar-field': 'bar-field-value',
      'not-visited-field': 'not-visted-field-value',
    };

    schema = {
      fields: [
        {
          name: 'wizard',
          component: 'wizard',
          fields: [
            {
              title: 'foo-step',
              name: '1',
              fields: [
                {
                  name: 'foo-field',
                  component: 'text-field',
                  'aria-label': 'foo',
                },
              ],
              nextStep: '2',
            },
            {
              name: '2',
              title: 'bar-step',
              fields: [
                {
                  name: 'bar-field',
                  component: 'text-field',
                  'aria-label': 'bar',
                },
              ],
            },
          ],
        },
      ],
    };

    initialProps = {
      schema,
      componentMapper,
      FormTemplate: (props) => <FormTemplate showFormControls={false} {...props} />,
      onSubmit: jest.fn(),
      onCancel: jest.fn(),
    };

    nestedSchema = {
      fields: [
        {
          name: 'wizard',
          component: 'wizard',
          fields: [
            {
              title: 'foo-step',
              name: '1',
              fields: [
                {
                  name: 'nested.foo-field',
                  component: 'text-field',
                },
              ],
              nextStep: '2',
            },
            {
              name: '2',
              title: 'bar-step',
              fields: [
                {
                  name: 'nested.second.bar-field',
                  component: 'text-field',
                },
              ],
            },
          ],
        },
      ],
    };

    initialValuesNestedSchema = {
      nested: {
        'foo-field': 'foo-field-value',
        second: {
          'bar-field': 'bar-field-value',
        },
      },
      'not-visited-field': 'not-visted-field-value',
    };

    Title = () => 'Title';
    Description = () => 'description';

    schemaWithHeader = {
      fields: [
        {
          name: 'wizard',
          component: 'wizard',
          title: <Title />,
          description: <Description />,
          inModal: true,
          closeButtonAriaLabel: 'Close wizard',
          fields: [
            {
              title: 'foo-step',
              name: '1',
              fields: [
                {
                  name: 'foo-field',
                  component: 'text-field',
                },
              ],
            },
          ],
        },
      ],
    };
  });

  it('should render correctly and unrender', () => {
    render(<FormRenderer {...initialProps} />);

    expect(screen.getByText('foo-step', { selector: 'button' })).toBeInTheDocument();

    cleanup();
  });

  it('should open nav', async () => {
    render(<FormRenderer {...initialProps} />);

    expect(screen.getByText('foo-step', { selector: 'button.pf-m-current' }).closest('.pf-m-expanded')).toBeNull();

    await userEvent.click(screen.getByLabelText('Wizard Toggle'));

    expect(screen.getByText('foo-step', { selector: 'button.pf-m-current' }).closest('.pf-m-expanded')).toBeDefined();
  });

  it('should call enter handler when pressing enter', async () => {
    // eslint-disable-next-line no-import-assign
    enterHandle.default = jest.fn();

    render(<FormRenderer {...initialProps} />);

    expect(enterHandle.default).not.toHaveBeenCalled();

    const event = expect.objectContaining({ key: 'Enter' });
    const formOptions = expect.any(Object);
    const handleNext = expect.any(Function);
    const handleSubmit = expect.any(Function);
    const findCurrentStep = expect.any(Function);

    await userEvent.type(screen.getByLabelText('foo'), '{enter}');

    expect(enterHandle.default).toHaveBeenCalledWith(event, formOptions, '1', findCurrentStep, handleNext, handleSubmit);
  });

  it('should call onCancel handler when pressing escape in modal', async () => {
    schema = {
      fields: [
        {
          name: 'wizard',
          component: 'wizard',
          inModal: true,
          fields: [
            {
              title: 'foo-step',
              name: '1',
              fields: [
                {
                  name: 'foo-field',
                  component: 'text-field',
                  'aria-label': 'foo',
                },
              ],
            },
          ],
        },
      ],
    };

    const onCancel = jest.fn();

    render(<FormRenderer {...initialProps} schema={schema} onCancel={onCancel} />);

    expect(onCancel).not.toHaveBeenCalled();

    await userEvent.type(screen.getByLabelText('foo'), '{escape}');

    expect(onCancel).toHaveBeenCalledWith({}, expect.any(Object));
  });

  it('should render correctly with objects as substepOf and nodes titles', () => {
    schema = {
      fields: [
        {
          name: 'wizard',
          component: 'wizard',
          inModal: true,
          fields: [
            {
              title: <h1>Custom title</h1>,
              name: 'first-step',
              fields: [],
              nextStep: 'middle-step',
              substepOf: { name: 'summary', title: <h2>Custom title 2</h2> },
            },
            {
              name: 'middle-step',
              title: 'middle-step',
              fields: [],
              substepOf: 'summary',
              nextStep: 'end',
            },
            {
              name: 'end',
              title: <h3>Custom title 3</h3>,
              fields: [],
            },
          ],
        },
      ],
    };

    render(<FormRenderer {...initialProps} schema={schema} />);

    expect(screen.getAllByText('Custom title')).toBeTruthy();
    expect(screen.getAllByText('Custom title 2')).toBeTruthy();
    expect(screen.getAllByText('Custom title 3')).toBeTruthy();
  });

  it('should render correctly with custom StepTemplate on field', () => {
    const StepTemplate = () => <h1>Custom StepTemplate</h1>;

    schema = {
      fields: [
        {
          name: 'wizard',
          component: 'wizard',
          fields: [
            {
              title: <h1>Custom title</h1>,
              name: 'first-step',
              fields: [],
              StepTemplate,
            },
          ],
        },
      ],
    };

    render(<FormRenderer {...initialProps} schema={schema} />);

    expect(screen.getByText('Custom StepTemplate')).toBeInTheDocument();
  });

  it('should render correctly with custom StepTemplate on wizard', () => {
    const StepTemplate = () => <h1>Custom StepTemplate</h1>;

    schema = {
      fields: [
        {
          name: 'wizard',
          component: 'wizard',
          StepTemplate,
          fields: [
            {
              title: <h1>Custom title</h1>,
              name: 'first-step',
              fields: [],
            },
          ],
        },
      ],
    };

    render(<FormRenderer {...initialProps} schema={schema} />);

    expect(screen.getByText('Custom StepTemplate')).toBeInTheDocument();
  });

  it('should render correctly with custom StepTemplate on wizard and step', () => {
    const StepTemplate = () => <h1>Custom StepTemplate</h1>;
    const StepTemplateField = () => <h1>Custom Field StepTemplate</h1>;

    schema = {
      fields: [
        {
          name: 'wizard',
          component: 'wizard',
          StepTemplate,
          fields: [
            {
              title: <h1>Custom title</h1>,
              name: 'first-step',
              fields: [],
              StepTemplate: StepTemplateField,
            },
          ],
        },
      ],
    };

    render(<FormRenderer {...initialProps} schema={schema} />);

    expect(() => screen.getByText('Custom StepTemplate')).toThrow();
    expect(screen.getByText('Custom Field StepTemplate')).toBeInTheDocument();
  });

  it('should render correctly in modal and unrender', () => {
    schema = {
      fields: [
        {
          name: 'wizard',
          component: 'wizard',
          inModal: true,
          fields: [
            {
              title: 'foo-step',
              name: '1',
              fields: [
                {
                  name: 'foo-field',
                  component: 'text-field',
                },
              ],
              nextStep: '2',
            },
            {
              name: '2',
              title: 'bar-step',
              fields: [
                {
                  name: 'bar-field',
                  component: 'text-field',
                },
              ],
            },
          ],
        },
      ],
    };

    render(<FormRenderer {...initialProps} schema={schema} />);

    expect(screen.getByText('foo-step', { selector: 'button' })).toBeInTheDocument();

    cleanup();
  });

  it('should render correctly with custom title and description', () => {
    render(<FormRenderer {...initialProps} schema={schemaWithHeader} />);

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('description')).toBeInTheDocument();
  });

  it('should render correctly with custom buttons', () => {
    const Buttons = () => <div>Hello</div>;

    schema = {
      fields: [
        {
          name: 'wizard',
          component: 'wizard',
          fields: [
            {
              title: 'foo-step',
              name: '1',
              buttons: Buttons,
              fields: [
                {
                  name: 'foo-field',
                  component: 'text-field',
                },
              ],
            },
          ],
        },
      ],
    };

    render(<FormRenderer {...initialProps} schema={schema} />);

    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('should call submit function', async () => {
    const onSubmit = jest.fn();

    render(<FormRenderer {...initialProps} onSubmit={onSubmit} />);

    await userEvent.click(screen.getByText('Next'));
    await userEvent.click(screen.getByText('Submit'));

    expect(onSubmit).toHaveBeenCalled();
  });

  it('should go to next step correctly and submit data and formOptions', async () => {
    const onSubmit = jest.fn();

    render(<FormRenderer {...initialProps} onSubmit={onSubmit} initialValues={initialValues} />);

    expect(screen.getByText('foo-step', { selector: '.pf-m-current' })).toBeInTheDocument();

    await userEvent.click(screen.getByText('Next'));

    expect(screen.getByText('bar-step', { selector: '.pf-m-current' })).toBeInTheDocument();

    await userEvent.click(screen.getByText('Submit'));
    const formOptions = expect.any(Object);
    const state = {
      activeStep: '2',
      activeStepIndex: 1,
      isDynamic: false,
      loading: false,
      maxStepIndex: 1,
      navSchema: [
        { index: 0, name: '1', primary: true, substepOf: undefined, substepOfTitle: undefined, title: 'foo-step' },
        { index: 1, name: '2', primary: true, substepOf: undefined, substepOfTitle: undefined, title: 'bar-step' },
      ],
      prevSteps: ['1'],
      registeredFieldsHistory: { 1: ['foo-field'] },
    };

    expect(onSubmit).toHaveBeenCalledWith(
      {
        'foo-field': 'foo-field-value',
        'bar-field': 'bar-field-value',
      },
      formOptions,
      state
    );
  });

  it('should pass values and state to cancel button', async () => {
    const onCancel = jest.fn();

    render(<FormRenderer {...initialProps} onCancel={(values, state) => onCancel(values, state)} initialValues={initialValues} />);

    await userEvent.click(screen.getByText('Cancel'));

    const state = expect.objectContaining({
      activeStep: expect.any(String),
      activeStepIndex: expect.any(Number),
      isDynamic: expect.any(Boolean),
      loading: expect.any(Boolean),
      maxStepIndex: expect.any(Number),
      navSchema: expect.any(Object),
      prevSteps: expect.any(Array),
    });

    expect(onCancel).toHaveBeenCalledWith(initialValues, state);
  });

  it('should pass values and state to cancel - close icon', async () => {
    const onCancel = jest.fn();

    render(
      <FormRenderer {...initialProps} onCancel={(values, state) => onCancel(values, state)} initialValues={initialValues} schema={schemaWithHeader} />
    );

    await userEvent.click(screen.getByLabelText('Close wizard'));

    const state = expect.objectContaining({
      activeStep: expect.any(String),
      activeStepIndex: expect.any(Number),
      isDynamic: expect.any(Boolean),
      loading: expect.any(Boolean),
      maxStepIndex: expect.any(Number),
      navSchema: expect.any(Object),
      prevSteps: expect.any(Array),
    });

    expect(onCancel).toHaveBeenCalledWith(initialValues, state);
  });

  it('should submit data when nested schema', async () => {
    const onSubmit = jest.fn();

    render(<FormRenderer {...initialProps} schema={nestedSchema} onSubmit={onSubmit} initialValues={initialValuesNestedSchema} />);

    await userEvent.click(screen.getByText('Next'));
    await userEvent.click(screen.getByText('Submit'));

    const formOptions = expect.any(Object);
    const state = expect.any(Object);

    expect(onSubmit).toHaveBeenCalledWith(
      {
        nested: {
          'foo-field': 'foo-field-value',
          second: {
            'bar-field': 'bar-field-value',
          },
        },
      },
      formOptions,
      state
    );
  });

  it('should build simple navigation', () => {
    render(<FormRenderer {...initialProps} />);

    expect(screen.getByText('foo-step', { selector: '.pf-v5-c-wizard__nav-link' })).toBeInTheDocument();
    expect(screen.getByText('bar-step', { selector: '.pf-v5-c-wizard__nav-link' })).toBeInTheDocument();
  });

  it('should jump when click simple navigation', async () => {
    render(<FormRenderer {...initialProps} />);

    expect(screen.getByLabelText('foo', { selector: 'input' })).toBeInTheDocument();

    await userEvent.click(screen.getByText('Next'));

    expect(screen.getByLabelText('bar', { selector: 'input' })).toBeInTheDocument();

    await userEvent.click(screen.getByText('foo-step', { selector: '.pf-v5-c-wizard__nav-link' }));

    expect(screen.getByLabelText('foo', { selector: 'input' })).toBeInTheDocument();

    await userEvent.click(screen.getByText('bar-step', { selector: '.pf-v5-c-wizard__nav-link' }));

    expect(screen.getByLabelText('bar', { selector: 'input' })).toBeInTheDocument();
  });

  it('should not fail when click on the first step', async () => {
    render(<FormRenderer {...initialProps} />);

    expect(screen.getByLabelText('foo', { selector: 'input' })).toBeInTheDocument();

    await userEvent.click(screen.getByText('foo-step', { selector: '.pf-v5-c-wizard__nav-link' }));

    expect(screen.getByLabelText('foo', { selector: 'input' })).toBeInTheDocument();
  });

  it('should build simple navigation with substeps', () => {
    schema = {
      fields: [
        {
          component: 'wizard',
          name: 'wizard',
          fields: [
            {
              title: 'foo-step',
              name: '1',
              fields: [
                {
                  name: 'foo-field',
                  component: 'text-field',
                  'aria-label': 'foo',
                },
              ],
              nextStep: '2',
            },
            {
              name: '2',
              title: 'bar-step',
              substepOf: 'barbar',
              fields: [
                {
                  name: 'bar-field',
                  component: 'text-field',
                  'aria-label': 'bar',
                },
              ],
            },
          ],
        },
      ],
    };

    render(<FormRenderer {...initialProps} schema={schema} />);

    expect(screen.getAllByText('foo-step', { selector: '.pf-v5-c-wizard__nav-link' })).toBeTruthy();
    expect(screen.getAllByText('bar-step', { selector: '.pf-v5-c-wizard__nav-link' })).toBeTruthy();
    expect(screen.getAllByText('barbar', { selector: '.pf-v5-c-wizard__nav-link' })).toBeTruthy();
  });

  it('should jump with substeps', async () => {
    schema = {
      fields: [
        {
          component: 'wizard',
          name: 'wizard',
          fields: [
            {
              title: 'foo-step',
              name: '1',
              fields: [
                {
                  name: 'foo-field',
                  component: 'text-field',
                  'aria-label': 'foo',
                },
              ],
              nextStep: '2',
            },
            {
              name: '2',
              title: 'bar-step',
              substepOf: 'barbar',
              fields: [
                {
                  name: 'bar-field',
                  component: 'text-field',
                  'aria-label': 'bar',
                },
              ],
            },
          ],
        },
      ],
    };

    render(<FormRenderer {...initialProps} schema={schema} />);

    expect(screen.getByLabelText('foo', { selector: 'input' })).toBeInTheDocument();

    await userEvent.click(screen.getByText('Next'));

    expect(screen.getByLabelText('bar', { selector: 'input' })).toBeInTheDocument();

    await userEvent.click(screen.getByText('foo-step', { selector: '.pf-v5-c-wizard__nav-link' }));

    expect(screen.getByLabelText('foo', { selector: 'input' })).toBeInTheDocument();

    await userEvent.click(screen.getByText('barbar', { selector: '.pf-v5-c-wizard__nav-link' }));

    expect(screen.getByLabelText('bar', { selector: 'input' })).toBeInTheDocument();

    await userEvent.click(screen.getByText('Back'));

    expect(screen.getByLabelText('foo', { selector: 'input' })).toBeInTheDocument();

    await userEvent.click(screen.getByText('bar-step', { selector: '.pf-v5-c-wizard__nav-link' }));

    expect(screen.getByLabelText('bar', { selector: 'input' })).toBeInTheDocument();
  });

  it('should jump with substeps and dynamic', async () => {
    schema = {
      fields: [
        {
          component: 'wizard',
          name: 'wizard',
          isDynamic: true,
          fields: [
            {
              title: 'foo-step',
              name: '1',
              fields: [
                {
                  name: 'foo-field',
                  component: 'text-field',
                  'aria-label': 'foo',
                },
              ],
              nextStep: '2',
            },
            {
              name: '2',
              title: 'bar-step',
              substepOf: 'barbar',
              fields: [
                {
                  name: 'bar-field',
                  component: 'text-field',
                  'aria-label': 'bar',
                },
              ],
            },
          ],
        },
      ],
    };

    const { container } = render(<FormRenderer {...initialProps} schema={schema} />);

    expect(screen.getByLabelText('foo', { selector: 'input' })).toBeInTheDocument();
    expect(container.querySelectorAll('.pf-v5-c-wizard__nav-item')).toHaveLength(3);
    expect(container.querySelectorAll('.pf-v5-c-wizard__nav-link.pf-m-disabled')).toHaveLength(2); // steps + substep

    await userEvent.click(screen.getByText('Next'));

    expect(screen.getByLabelText('bar', { selector: 'input' })).toBeInTheDocument();
    expect(container.querySelectorAll('.pf-v5-c-wizard__nav-link.pf-m-disabled')).toHaveLength(0);

    await userEvent.click(screen.getByText('foo-step', { selector: '.pf-v5-c-wizard__nav-link' }));

    expect(screen.getByLabelText('foo', { selector: 'input' })).toBeInTheDocument();
    expect(container.querySelectorAll('.pf-v5-c-wizard__nav-item')).toHaveLength(3);

    await userEvent.click(screen.getByText('Next'));

    expect(screen.getByLabelText('bar', { selector: 'input' })).toBeInTheDocument();
    expect(container.querySelectorAll('.pf-v5-c-wizard__nav-item')).toHaveLength(3);
  });

  it('should disabled button when validating', async () => {
    const asyncValidator = () => new Promise((res) => setTimeout(() => res(), 100));

    schema = {
      fields: [
        {
          name: 'wizard',
          component: 'wizard',
          fields: [
            {
              title: 'foo-step',
              name: 'foo',
              fields: [
                {
                  name: 'foo-field',
                  component: 'text-field',
                  validate: [asyncValidator],
                },
              ],
              nextStep: 'ba',
            },
            {
              title: 'bar-step',
              name: 'bar',
              fields: [
                {
                  name: 'bar-field',
                  component: 'text-field',
                },
              ],
            },
          ],
        },
      ],
    };

    render(<FormRenderer {...initialProps} schema={schema} />);

    expect(screen.getByText('Next')).toBeDisabled();

    await waitFor(() => expect(screen.getByText('Next')).not.toBeDisabled());
  });

  it('should disabled navigation when validating', async () => {
    let resFn;

    const asyncValidator = jest.fn().mockImplementation(
      () =>
        new Promise((res) => {
          resFn = res;
        })
    );

    schema = {
      fields: [
        {
          name: 'wizard',
          component: 'wizard',
          fields: [
            {
              title: 'foo-step',
              name: 'foo',
              fields: [
                {
                  name: 'foo-field',
                  component: 'text-field',
                  validate: [asyncValidator],
                  'aria-label': 'foo',
                },
              ],
              nextStep: 'bar',
            },
            {
              title: 'bar-step',
              name: 'bar',
              fields: [
                {
                  name: 'bar-field',
                  component: 'text-field',
                },
              ],
            },
          ],
        },
      ],
    };

    render(<FormRenderer {...initialProps} schema={schema} />);

    resFn();

    await waitFor(() => expect(screen.getByText('Next')).not.toBeDisabled());

    await userEvent.click(screen.getByText('Next'));

    await waitFor(() => expect(screen.getByText('bar-step', { selector: '.pf-v5-c-wizard__nav-link' })).not.toBeDisabled());

    await userEvent.click(screen.getByText('Back'));

    await userEvent.type(screen.getByLabelText('foo'), 'X');

    expect(screen.getByText('bar-step', { selector: '.pf-v5-c-wizard__nav-link' })).toBeDisabled();

    resFn();

    await waitFor(() => expect(screen.getByText('bar-step', { selector: '.pf-v5-c-wizard__nav-link' })).not.toBeDisabled());
  });

  it('should disable steps when invalid', async () => {
    const schema = {
      fields: [
        {
          component: componentTypes.WIZARD,
          name: 'wizard',
          fields: [
            {
              title: 'foo-step',
              name: '1',
              fields: [
                {
                  name: 'foo-field',
                  label: 'foo',
                  component: componentTypes.TEXT_FIELD,
                  'aria-label': 'foo',
                },
              ],
              nextStep: '2',
            },
            {
              name: '2',
              title: 'bar-step',
              substepOf: 'barbar',
              nextStep: '3',
              fields: [
                {
                  name: 'bar-field',
                  label: 'bar',
                  component: componentTypes.TEXT_FIELD,
                  validate: [
                    {
                      type: validatorTypes.REQUIRED,
                    },
                  ],
                  'aria-label': 'bar',
                },
              ],
            },
            {
              name: '3',
              title: 'conan-step',
              substepOf: 'barbar',
              fields: [
                {
                  name: 'conan-field',
                  label: 'conan',
                  component: componentTypes.TEXT_FIELD,
                  'aria-label': 'conan',
                },
              ],
            },
          ],
        },
      ],
    };

    render(
      <FormRenderer
        schema={schema}
        componentMapper={componentMapper}
        FormTemplate={(props) => <FormTemplate {...props} showFormControls={false} />}
        onSubmit={jest.fn()}
        onCancel={jest.fn()}
      />
    );

    expect(screen.getByLabelText('foo')).toBeInTheDocument();

    await userEvent.click(screen.getByText('Next'));
    expect(screen.getByLabelText('bar')).toBeInTheDocument();

    await userEvent.click(screen.getByText('Next'));
    // however, it is not possible because form is invalid
    expect(screen.getByLabelText('bar')).toBeInTheDocument();

    await userEvent.type(screen.getByLabelText('bar'), 'hello');
    await userEvent.click(screen.getByText('Next'));
    // voila
    expect(screen.getByLabelText('conan')).toBeInTheDocument();
    expect(screen.getByText('conan-step', { selector: '.pf-v5-c-wizard__nav-link' })).not.toBeDisabled();

    await userEvent.click(screen.getByText('Back'));

    expect(screen.getByLabelText('bar')).toBeInTheDocument();

    await userEvent.clear(screen.getByLabelText('bar'));
    await userEvent.click(screen.getByText('Next'));
    // it is invalid :(
    expect(screen.getByLabelText('bar')).toBeInTheDocument();

    // let's look if last nav item is disabled (click event is working with 'disabled' <a> element)
    expect(screen.getByText('conan-step', { selector: '.pf-v5-c-wizard__nav-link' })).toBeDisabled();

    // go to first step
    await userEvent.click(screen.getByText('foo-step', { selector: '.pf-v5-c-wizard__nav-link' }));

    // still invalid :(
    expect(screen.getByLabelText('foo')).toBeInTheDocument();
    expect(screen.getByText('conan-step', { selector: '.pf-v5-c-wizard__nav-link' })).toBeDisabled();

    // make form valid again
    await userEvent.click(screen.getByText('Next'));

    await userEvent.type(screen.getByLabelText('bar'), 'hello');
    await userEvent.click(screen.getByText('Next'));
    expect(screen.getByText('conan-step', { selector: '.pf-v5-c-wizard__nav-link' })).not.toBeDisabled();
  });

  describe('predicting steps', () => {
    const FIRST_TITLE = 'Get started with adding source';
    const SECOND_TITLE_AWS = 'Configure AWS';
    const SECOND_TITLE_GOOLE = 'Configure google';
    const THIRD_TITLE = 'Summary';

    const wizardSchema = {
      fields: [
        {
          component: componentTypes.WIZARD,
          name: 'wizard',
          fields: [
            {
              title: FIRST_TITLE,
              name: 1,
              nextStep: {
                when: 'source.source-type',
                stepMapper: {
                  aws: 'aws',
                  google: 'google',
                },
              },
              fields: [
                {
                  name: 'source.source-type',
                  label: 'Source type',
                  component: componentTypes.TEXT_FIELD,
                  'aria-label': 'source_type',
                },
              ],
            },
            {
              title: SECOND_TITLE_AWS,
              name: 'aws',
              nextStep: 'summary',
              fields: [
                {
                  component: componentTypes.TEXT_FIELD,
                  name: 'aws-field',
                  label: 'Aws field part',
                  'aria-label': 'aws',
                },
              ],
            },
            {
              title: SECOND_TITLE_GOOLE,
              name: 'google',
              nextStep: 'summary',
              fields: [
                {
                  component: componentTypes.TEXT_FIELD,
                  name: 'google.google-field',
                  label: 'Google field part',
                  'aria-label': 'google',
                },
              ],
            },
            {
              title: THIRD_TITLE,
              fields: [],
              name: 'summary',
            },
          ],
        },
      ],
    };

    it('predict steps with dynamic wizard', async () => {
      const { container } = render(
        <FormRenderer
          schema={wizardSchema}
          componentMapper={componentMapper}
          FormTemplate={(props) => <FormTemplate {...props} showFormControls={false} />}
          onSubmit={jest.fn()}
          onCancel={jest.fn()}
        />
      );

      expect([...container.getElementsByClassName('pf-v5-c-wizard__nav-link')].map((e) => e.textContent)).toEqual([FIRST_TITLE]);

      await userEvent.type(screen.getByLabelText('source_type'), 'aws');
      await userEvent.click(screen.getByText('Next'));

      expect([...container.getElementsByClassName('pf-v5-c-wizard__nav-link')].map((e) => e.textContent)).toEqual([
        FIRST_TITLE,
        SECOND_TITLE_AWS,
        THIRD_TITLE,
      ]);
    });

    it('disable nav when jumped into compileMapper step', async () => {
      const { container } = render(
        <FormRenderer
          schema={wizardSchema}
          componentMapper={componentMapper}
          FormTemplate={(props) => <FormTemplate {...props} showFormControls={false} />}
          onSubmit={jest.fn()}
          onCancel={jest.fn()}
        />
      );

      await userEvent.type(screen.getByLabelText('source_type'), 'aws');
      await userEvent.click(screen.getByText('Next'));
      await userEvent.click(screen.getByText('Back'));

      expect([...container.getElementsByClassName('pf-v5-c-wizard__nav-link')].map((e) => e.disabled)).toEqual([false, true, true]);
    });

    it('disable nav when jumped into compileMapper step from invalid step', async () => {
      const wizardSchema = {
        fields: [
          {
            component: componentTypes.WIZARD,
            name: 'wizard',
            fields: [
              {
                title: FIRST_TITLE,
                name: 1,
                nextStep: {
                  when: 'source.source-type',
                  stepMapper: {
                    aws: 'aws',
                  },
                },
                fields: [
                  {
                    name: 'source.source-type',
                    label: 'Source type',
                    component: componentTypes.TEXT_FIELD,
                    'aria-label': 'source_type',
                  },
                ],
              },
              {
                title: SECOND_TITLE_AWS,
                name: 'aws',
                nextStep: 'summary',
                fields: [
                  {
                    component: componentTypes.TEXT_FIELD,
                    name: 'aws-field',
                    label: 'Aws field part',
                    validate: [{ type: validatorTypes.REQUIRED }],
                    'aria-label': 'aws',
                  },
                ],
              },
            ],
          },
        ],
      };

      const { container } = render(
        <FormRenderer
          schema={wizardSchema}
          componentMapper={componentMapper}
          FormTemplate={(props) => <FormTemplate {...props} showFormControls={false} />}
          onSubmit={jest.fn()}
          onCancel={jest.fn()}
        />
      );

      await userEvent.type(screen.getByLabelText('source_type'), 'aws');
      await userEvent.click(screen.getByText('Next'));
      expect([...container.getElementsByClassName('pf-v5-c-wizard__nav-link')].map((e) => e.disabled)).toEqual([false, false]);

      await userEvent.type(screen.getByLabelText('aws'), '{backspace}');
      await userEvent.click(screen.getByText('Back'));

      expect([...container.getElementsByClassName('pf-v5-c-wizard__nav-link')].map((e) => e.disabled)).toEqual([false, true]);
    });

    it('disable nav when jumped into step with function nextStep', async () => {
      const NEXTSTEP_FUNCTION = jest.fn().mockReturnValue('aws');
      const wizardSchemaWithNextStepFunction = {
        fields: [
          {
            component: componentTypes.WIZARD,
            name: 'wizard',
            fields: [
              {
                title: FIRST_TITLE,
                name: 1,
                nextStep: NEXTSTEP_FUNCTION,
                fields: [
                  {
                    name: 'source.source-type',
                    label: 'Source type',
                    component: componentTypes.TEXT_FIELD,
                    'aria-label': 'source_type',
                  },
                ],
              },
              {
                title: SECOND_TITLE_AWS,
                name: 'aws',
                nextStep: 'summary',
                fields: [
                  {
                    component: componentTypes.TEXT_FIELD,
                    name: 'aws-field',
                    label: 'Aws field part',
                    'aria-label': 'aws',
                  },
                ],
              },
            ],
          },
        ],
      };

      const EXPECTED_VALUES = {
        source: {
          'source-type': 'aws',
        },
      };

      const { container } = render(
        <FormRenderer
          schema={wizardSchemaWithNextStepFunction}
          componentMapper={componentMapper}
          FormTemplate={(props) => <FormTemplate {...props} showFormControls={false} />}
          onSubmit={jest.fn()}
          onCancel={jest.fn()}
        />
      );

      await userEvent.type(screen.getByLabelText('source_type'), 'aws');
      await userEvent.click(screen.getByText('Next'));

      expect([...container.getElementsByClassName('pf-v5-c-wizard__nav-link')].map((e) => e.disabled)).toEqual([false, false]);

      await userEvent.click(screen.getByText('Back'));

      expect([...container.getElementsByClassName('pf-v5-c-wizard__nav-link')].map((e) => e.disabled)).toEqual([false, true]);

      const firstArgumentOfLastNextStepCall = NEXTSTEP_FUNCTION.mock.calls[NEXTSTEP_FUNCTION.mock.calls.length - 1][0];
      expect(firstArgumentOfLastNextStepCall).toEqual({ values: EXPECTED_VALUES });
    });

    it('disable nav when jumped into disableForwardJumping step', async () => {
      const wizardSchema = {
        fields: [
          {
            component: componentTypes.WIZARD,
            name: 'wizard',
            fields: [
              {
                title: FIRST_TITLE,
                name: 1,
                nextStep: 'aws',
                disableForwardJumping: true,
                fields: [
                  {
                    name: 'source.source-type',
                    label: 'Source type',
                    component: componentTypes.TEXT_FIELD,
                    'aria-label': 'source_type',
                  },
                ],
              },
              {
                title: SECOND_TITLE_AWS,
                name: 'aws',
                nextStep: 'summary',
                fields: [
                  {
                    component: componentTypes.TEXT_FIELD,
                    name: 'aws-field',
                    label: 'Aws field part',
                  },
                ],
              },
            ],
          },
        ],
      };

      const { container } = render(
        <FormRenderer
          schema={wizardSchema}
          componentMapper={componentMapper}
          FormTemplate={(props) => <FormTemplate {...props} showFormControls={false} />}
          onSubmit={jest.fn()}
          onCancel={jest.fn()}
        />
      );

      await userEvent.type(screen.getByLabelText('source_type'), 'aws');
      await userEvent.click(screen.getByText('Next'));

      expect([...container.getElementsByClassName('pf-v5-c-wizard__nav-link')].map((e) => e.disabled)).toEqual([false, false]);

      await userEvent.click(screen.getByText('Back'));

      expect([...container.getElementsByClassName('pf-v5-c-wizard__nav-link')].map((e) => e.disabled)).toEqual([false, true]);
    });

    it('crossroads variable predicts in realtime', async () => {
      const wizardSchema = {
        fields: [
          {
            component: componentTypes.WIZARD,
            name: 'wizard',
            crossroads: ['source.source-type'],
            fields: [
              {
                title: 'first-step',
                name: 1,
                nextStep: {
                  when: 'source.source-type',
                  stepMapper: {
                    aws: 'aws',
                    google: 'summary',
                  },
                },
                fields: [
                  {
                    name: 'source.source-type',
                    label: 'Source type',
                    component: componentTypes.TEXT_FIELD,
                    'aria-label': 'source_type',
                  },
                ],
              },
              {
                title: 'second-step',
                name: 'aws',
                nextStep: 'summary',
                fields: [],
              },
              {
                title: 'summary',
                name: 'summary',
                fields: [],
              },
            ],
          },
        ],
      };

      const { container } = render(<FormRenderer {...initialProps} schema={wizardSchema} />);

      expect([...container.getElementsByClassName('pf-v5-c-wizard__nav-link')].map((e) => e.disabled)).toEqual([false]);
      expect([...container.getElementsByClassName('pf-v5-c-wizard__nav-link')].map((e) => e.textContent)).toEqual(['first-step']);

      await userEvent.type(screen.getByLabelText('source_type'), 'aws');

      expect([...container.getElementsByClassName('pf-v5-c-wizard__nav-link')].map((e) => e.disabled)).toEqual([false, true, true]);
      expect([...container.getElementsByClassName('pf-v5-c-wizard__nav-link')].map((e) => e.textContent)).toEqual([
        'first-step',
        'second-step',
        'summary',
      ]);

      await userEvent.clear(screen.getByLabelText('source_type'));
      await userEvent.type(screen.getByLabelText('source_type'), 'google');

      // predict steps for google
      expect([...container.getElementsByClassName('pf-v5-c-wizard__nav-link')].map((e) => e.disabled)).toEqual([false, true]);
      expect([...container.getElementsByClassName('pf-v5-c-wizard__nav-link')].map((e) => e.textContent)).toEqual(['first-step', 'summary']);

      await userEvent.click(screen.getByText('Next'));

      expect([...container.getElementsByClassName('pf-v5-c-wizard__nav-link')].map((e) => e.disabled)).toEqual([false, false]);
      expect([...container.getElementsByClassName('pf-v5-c-wizard__nav-link')].map((e) => e.textContent)).toEqual(['first-step', 'summary']);

      // click on first nav link
      await userEvent.click(screen.getByText('first-step'));
      // keep the second step enabled
      expect([...container.getElementsByClassName('pf-v5-c-wizard__nav-link')].map((e) => e.disabled)).toEqual([false, false]);
      expect([...container.getElementsByClassName('pf-v5-c-wizard__nav-link')].map((e) => e.textContent)).toEqual(['first-step', 'summary']);

      await userEvent.clear(screen.getByLabelText('source_type'));
      await userEvent.type(screen.getByLabelText('source_type'), 'aws');

      expect([...container.getElementsByClassName('pf-v5-c-wizard__nav-link')].map((e) => e.disabled)).toEqual([false, true, true]);
      expect([...container.getElementsByClassName('pf-v5-c-wizard__nav-link')].map((e) => e.textContent)).toEqual([
        'first-step',
        'second-step',
        'summary',
      ]);

      await userEvent.clear(screen.getByLabelText('source_type'));
      await userEvent.type(screen.getByLabelText('source_type'), 'google');

      expect([...container.getElementsByClassName('pf-v5-c-wizard__nav-link')].map((e) => e.disabled)).toEqual([false, true]);
      expect([...container.getElementsByClassName('pf-v5-c-wizard__nav-link')].map((e) => e.textContent)).toEqual(['first-step', 'summary']);
    });

    it('crossroads variable predicts in realtime - disableForwardJumping', async () => {
      const wizardSchema = {
        fields: [
          {
            component: componentTypes.WIZARD,
            name: 'wizard',
            crossroads: ['source.source-type'],
            fields: [
              {
                title: 'first-step',
                name: 1,
                nextStep: {
                  when: 'source.source-type',
                  stepMapper: {
                    aws: 'aws',
                    google: 'summary',
                  },
                },
                disableForwardJumping: true,
                fields: [
                  {
                    name: 'source.source-type',
                    label: 'Source type',
                    component: componentTypes.TEXT_FIELD,
                    'aria-label': 'source_type',
                  },
                ],
              },
              {
                title: 'second-step',
                name: 'aws',
                nextStep: 'summary',
                fields: [],
              },
              {
                title: 'summary',
                name: 'summary',
                fields: [],
              },
            ],
          },
        ],
      };

      const { container } = render(<FormRenderer {...initialProps} schema={wizardSchema} />);

      expect([...container.getElementsByClassName('pf-v5-c-wizard__nav-link')].map((e) => e.disabled)).toEqual([false]);
      expect([...container.getElementsByClassName('pf-v5-c-wizard__nav-link')].map((e) => e.textContent)).toEqual(['first-step']);

      await userEvent.clear(screen.getByLabelText('source_type'));
      await userEvent.type(screen.getByLabelText('source_type'), 'google');

      expect([...container.getElementsByClassName('pf-v5-c-wizard__nav-link')].map((e) => e.disabled)).toEqual([false, true]);
      expect([...container.getElementsByClassName('pf-v5-c-wizard__nav-link')].map((e) => e.textContent)).toEqual(['first-step', 'summary']);

      await userEvent.click(screen.getByText('Next'));

      expect([...container.getElementsByClassName('pf-v5-c-wizard__nav-link')].map((e) => e.disabled)).toEqual([false, false]);
      expect([...container.getElementsByClassName('pf-v5-c-wizard__nav-link')].map((e) => e.textContent)).toEqual(['first-step', 'summary']);

      await userEvent.click(screen.getByText('first-step'));

      expect([...container.getElementsByClassName('pf-v5-c-wizard__nav-link')].map((e) => e.disabled)).toEqual([false, true]);
      expect([...container.getElementsByClassName('pf-v5-c-wizard__nav-link')].map((e) => e.textContent)).toEqual(['first-step', 'summary']);
    });
  });

  describe('reducer', () => {
    it('returns default', () => {
      const initialState = { aa: 'aa' };
      expect(reducer(initialState, { type: 'nonsense' })).toEqual(initialState);
    });

    it('closes nav', () => {
      const initialState = { openNav: true };
      expect(reducer(initialState, { type: 'closeNav' })).toEqual({ openNav: false });
    });

    it('opens nav', () => {
      const initialState = { openNav: false };
      expect(reducer(initialState, { type: 'openNav' })).toEqual({ openNav: true });
    });

    it('common reducer - correctly assigns substepOf title when node', () => {
      const initialState = {};
      const formOptions = { getState: () => ({}) };
      const customTitle = <span>Custom title</span>;
      const fields = [
        {
          name: 'security',
          title: 'Security',
          nextStep: 'credentials',
          substepOf: { name: 'Configuration', title: customTitle },
          fields: [],
        },
        {
          name: 'credentials',
          title: 'Credentials',
          nextStep: 'summary',
          substepOf: 'Configuration',
          fields: [],
        },
        {
          name: 'summary',
          title: 'Summary',
          nextStep: 'pepa-step',
          fields: [],
        },
        {
          name: 'pepa-step',
          nextStep: 'pepa-step-2',
          title: 'title',
          substepOf: { name: 'pepa', title: 'pepa-title' },
          fields: [],
        },
        {
          name: 'pepa-step-2',
          title: 'title 2',
          fields: [],
          substepOf: 'pepa',
        },
      ];

      expect(commonReducer(initialState, { type: 'finishLoading', payload: { formOptions, fields } })).toEqual({
        loading: false,
        navSchema: [
          { index: 0, name: 'security', primary: true, substepOf: 'Configuration', substepOfTitle: customTitle, title: 'Security' },
          {
            index: 1,
            name: 'credentials',
            primary: false,
            substepOf: 'Configuration',
            substepOfTitle: customTitle,
            title: 'Credentials',
          },
          { index: 2, name: 'summary', primary: true, substepOf: undefined, substepOfTitle: undefined, title: 'Summary' },
          { index: 3, name: 'pepa-step', primary: true, substepOf: 'pepa', substepOfTitle: 'pepa-title', title: 'title' },
          { index: 4, name: 'pepa-step-2', primary: false, substepOf: 'pepa', substepOfTitle: 'pepa-title', title: 'title 2' },
        ],
      });
    });
  });
});
