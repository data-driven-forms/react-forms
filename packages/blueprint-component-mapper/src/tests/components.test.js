import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FormRenderer, componentTypes } from '@data-driven-forms/react-form-renderer';
import FormTemplate from '../form-template/form-template';
import componentMapper from '../component-mapper/component-mapper';
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
            options.forEach((opt) => {
              expect(screen.getByText(opt.label)).toBeInTheDocument();
            });
          }

          expect(screen.getAllByText(field.label)).toBeTruthy();
          expect(() => screen.getByText(errorText)).toThrow();
        });

        it('renders with error', async () => {
          const errorField = {
            ...field,
            validate: [{ type: validatorTypes.REQUIRED }],
          };
          render(<RendererWrapper schema={{ fields: [errorField] }} />);

          await userEvent.click(screen.getByText('Submit'));

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
            render(
              <RendererWrapper
                schema={{
                  fields: [errorField, { name: 'error-reset-touched', component: componentTypes.TEXT_FIELD, validate: [{ type: 'required' }] }],
                }}
              />
            );
          });

          expect(screen.getAllByText(errorText)).toBeTruthy();
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
          expect(() => screen.getByText(description)).toThrow();
        });

        it('renders with error and helperText', async () => {
          const errorFields = {
            ...field,
            helperText,
            validate: [{ type: validatorTypes.REQUIRED }],
          };
          render(<RendererWrapper schema={{ fields: [errorFields] }} />);

          await userEvent.click(screen.getByText('Submit'));

          expect(screen.getByText(errorText)).toBeInTheDocument();
          expect(() => screen.getByText(helperText)).toThrow();
        });

        it('renders isRequired', () => {
          const requiredField = {
            ...field,
            isRequired: true,
          };
          render(<RendererWrapper schema={{ fields: [requiredField] }} />);

          expect(screen.getByText('(required)')).toBeInTheDocument();
        });

        it('renders isDisabled', () => {
          const disabledField = {
            ...field,
            isDisabled: true,
            'aria-label': field.name,
          };
          const { container } = render(<RendererWrapper schema={{ fields: [disabledField] }} />);

          if (component === componentTypes.RADIO) {
            options.forEach((opt) => {
              expect(screen.getByText(opt.label)).toHaveClass('bp4-disabled');
            });
          } else if ([componentTypes.SLIDER, componentTypes.DATE_PICKER, componentTypes.TIME_PICKER, componentTypes.SELECT].includes(component)) {
            expect(container.getElementsByClassName('bp4-disabled')).toHaveLength(1);
          } else {
            expect(screen.getAllByLabelText(field.name)[0]).toBeDisabled();
          }
        });

        it('renders isReadOnly', () => {
          const disabledField = {
            ...field,
            isReadOnly: true,
            'aria-label': field.name,
          };
          const { container } = render(<RendererWrapper schema={{ fields: [disabledField] }} />);

          if (component === componentTypes.RADIO) {
            options.forEach((opt) => {
              expect(screen.getByText(opt.label)).toHaveClass('bp4-disabled');
            });
          } else if ([componentTypes.SLIDER, componentTypes.DATE_PICKER, componentTypes.TIME_PICKER, componentTypes.SELECT].includes(component)) {
            expect(container.getElementsByClassName('bp4-disabled')).toHaveLength(1);
          } else {
            expect(screen.getAllByLabelText(field.name)[0]).toBeDisabled();
          }
        });

        it('renders with submit error', async () => {
          render(<RendererWrapper schema={schema} onSubmit={() => ({ [field.name]: errorText })} />);

          await userEvent.click(screen.getByText('Submit'));

          expect(screen.getByText(errorText)).toBeInTheDocument();
        });
      });
    });
  });
});
