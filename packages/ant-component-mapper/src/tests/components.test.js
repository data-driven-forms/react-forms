import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FormRenderer, componentTypes } from '@data-driven-forms/react-form-renderer';
import FormTemplate from '../form-template';
import componentMapper from '../component-mapper';
import { validatorTypes } from '@data-driven-forms/react-form-renderer';

describe('formFields generated tests', () => {
  const RendererWrapper = ({ schema = { fields: [] }, ...props }) => (
    <FormRenderer
      onSubmit={jest.fn()}
      FormTemplate={(props) => <FormTemplate {...props} />}
      schema={schema}
      componentMapper={componentMapper}
      subscription={{ submitFailed: true }}
      {...props}
    />
  );
  let field;
  let schema;

  const errorText = 'Required';
  const helperText = 'I am helper text';
  const description = 'This is description';
  const options = [
    { label: 'Cat', value: 'cats' },
    { label: 'Dog', value: 'dogs' },
    { label: 'Hamster', value: 'hamsters' },
  ];

  const componentsWithOptions = [componentTypes.RADIO, componentTypes.SELECT];

  beforeEach(() => {
    field = {};
    schema = [];
  });

  describe('components', () => {
    [
      componentTypes.TEXT_FIELD,
      componentTypes.TEXTAREA,
      componentTypes.RADIO,
      componentTypes.CHECKBOX,
      componentTypes.DATE_PICKER,
      componentTypes.TIME_PICKER,
      componentTypes.SWITCH,
      componentTypes.SELECT,
      componentTypes.SLIDER,
    ].forEach((component) => {
      describe(`Component type: ${component}`, () => {
        beforeEach(() => {
          field.component = component;
          field.name = 'field-name';
          field.label = 'Some label';

          if (componentsWithOptions.includes(component)) {
            field = {
              ...field,
              options,
            };
          }

          schema = { fields: [field] };
        });

        it('renders correctly', () => {
          render(<RendererWrapper schema={schema} />);

          if (component === componentTypes.RADIO) {
            options.forEach((option) => {
              expect(screen.getByText(option.label)).toBeInTheDocument();
            });
          }

          expect(screen.getByText(field.label)).toBeInTheDocument();

          if (![componentTypes.RADIO, componentTypes.SLIDER].includes(component)) {
            expect(screen.getByLabelText(field.label)).toBeInTheDocument();
          }
        });

        it('renders with error', async () => {
          const errorField = {
            ...field,
            validate: [{ type: validatorTypes.REQUIRED }],
          };
          render(<RendererWrapper schema={{ fields: [errorField] }} />);

          await act(async () => {
            await userEvent.click(screen.getByText('Submit'));
          });

          expect(screen.getByText(errorText)).toBeInTheDocument();
        });

        it('renders with warning', async () => {
          const errorField = {
            ...field,
            validate: [{ type: validatorTypes.REQUIRED, warning: true }],
            useWarnings: true,
            validateOnMount: true,
          };

          await act(async () => {
            render(<RendererWrapper schema={{ fields: [errorField] }} />);
          });

          expect(screen.getByText(errorText)).toBeInTheDocument();
        });

        it('renders with error and validateOnMount', async () => {
          const errorField = {
            ...field,
            validate: [{ type: validatorTypes.REQUIRED }],
            validateOnMount: true,
          };
          await act(async () => {
            render(<RendererWrapper schema={{ fields: [errorField] }} />);
          });

          expect(screen.getByText(errorText)).toBeInTheDocument();
        });

        it('renders with helperText', () => {
          const helpertextField = {
            ...field,
            helperText,
          };

          render(<RendererWrapper schema={{ fields: [helpertextField] }} />);

          expect(screen.getByText(helperText)).toBeInTheDocument();
        });

        it('renders with description', () => {
          const descriptionField = {
            ...field,
            description,
          };

          render(<RendererWrapper schema={{ fields: [descriptionField] }} />);

          expect(screen.getByText(description)).toBeInTheDocument();
        });

        it('renders with description and helperText', () => {
          const descriptionField = {
            ...field,
            description,
            helperText,
          };

          render(<RendererWrapper schema={{ fields: [descriptionField] }} />);

          expect(screen.getByText(helperText)).toBeInTheDocument();
        });

        it('renders with error and helperText', async () => {
          const errorFields = {
            ...field,
            helperText,
            validate: [{ type: validatorTypes.REQUIRED }],
          };

          render(<RendererWrapper schema={{ fields: [errorFields] }} />);

          await act(async () => {
            await userEvent.click(screen.getByText('Submit'));
          });

          expect(screen.getByText(errorText)).toBeInTheDocument();
        });

        it('renders isRequired', () => {
          const requiredField = {
            ...field,
            isRequired: true,
          };

          render(<RendererWrapper schema={{ fields: [requiredField] }} />);

          if (component === componentTypes.CHECKBOX) {
            expect(screen.getByText('*')).toBeInTheDocument();
          } else {
            expect(screen.getByText(field.label)).toHaveClass('ant-form-item-required');
          }
        });

        it('renders isDisabled', () => {
          const labelText = 'field';

          const disabledField = {
            ...field,
            isDisabled: true,
            'aria-label': labelText,
          };

          const { container } = render(<RendererWrapper schema={{ fields: [disabledField] }} />);

          if (component === componentTypes.SLIDER) {
            expect(screen.getByRole('slider')).toHaveAttribute('aria-disabled', 'true');
          } else if (component === componentTypes.RADIO) {
            expect(container.getElementsByTagName('input')[0].disabled).toEqual(true);
          } else if (component === componentTypes.SELECT) {
            expect(screen.getAllByLabelText(labelText)[0]).toHaveClass('ant-select-disabled');
          } else {
            expect(screen.getAllByLabelText(labelText)[0]).toBeDisabled();
          }
        });

        it('renders isReadOnly', () => {
          const labelText = 'field';

          const disabledField = {
            ...field,
            isReadOnly: true,
            'aria-label': labelText,
          };

          const { container } = render(<RendererWrapper schema={{ fields: [disabledField] }} />);

          if (component === componentTypes.SLIDER) {
            expect(screen.getByRole('slider')).toHaveAttribute('aria-disabled', 'true');
          } else if (component === componentTypes.RADIO) {
            expect(container.getElementsByTagName('input')[0].disabled).toEqual(true);
          } else if (component === componentTypes.SELECT) {
            expect(screen.getAllByLabelText(labelText)[0]).toHaveClass('ant-select-disabled');
          } else if (component === componentTypes.TEXTAREA || componentTypes.TEXT_FIELD === component) {
            expect(screen.getAllByLabelText(labelText)[0]).toHaveAttribute('readonly', '');
          } else {
            expect(screen.getAllByLabelText(labelText)[0]).toBeDisabled();
          }
        });

        it('renders with submitError', async () => {
          render(<RendererWrapper schema={schema} onSubmit={() => ({ [field.name]: errorText })} />);

          await act(async () => {
            await userEvent.click(screen.getByText('Submit'));
          });

          expect(screen.getByText(errorText)).toBeInTheDocument();
        });
      });
    });
  });
});
