import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FormRenderer, componentTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';

import FormTemplate from '../form-template';
import componentMapper from '../component-mapper';

describe('component tests', () => {
  const RendererWrapper = ({ schema = { fields: [] }, ...props }) => (
    <FormRenderer
      onSubmit={jest.fn()}
      FormTemplate={(props) => <FormTemplate {...props} />}
      schema={schema}
      componentMapper={{
        ...componentMapper,
        'text-field-number': {
          component: componentMapper[componentTypes.TEXT_FIELD],
          type: 'number',
        },
      }}
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
      'text-field-number',
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

        if (component !== 'text-field-number') {
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
                    fields: [errorField],
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
        }

        it('renders with description', () => {
          const descriptionField = {
            ...field,
            description,
          };
          render(<RendererWrapper schema={{ fields: [descriptionField] }} />);

          expect(screen.getAllByRole('button')[0]).toHaveClass('bx--tooltip__trigger');
        });

        it('renders isDisabled', () => {
          const disabledField = {
            ...field,
            isDisabled: true,
            'aria-label': field.name,
            ...(field.type === 'number' && { ariaLabel: field.name }),
          };
          const { container } = render(<RendererWrapper schema={{ fields: [disabledField] }} />);

          [...container.getElementsByTagName('input')].forEach((el) => expect(el).toBeDisabled());
        });

        it('renders isRequired', () => {
          const requiredField = {
            ...field,
            isRequired: true,
          };
          render(<RendererWrapper schema={{ fields: [requiredField] }} />);

          expect(screen.getByText('*')).toBeInTheDocument();
        });

        it('renders with submitError', async () => {
          render(<RendererWrapper schema={schema} onSubmit={() => ({ [field.name]: errorText })} />);

          await userEvent.click(screen.getByText('Submit'));

          expect(screen.getByText(errorText)).toBeInTheDocument();
        });
      });
    });
  });
});
