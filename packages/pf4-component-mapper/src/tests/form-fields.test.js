import React from 'react';

import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Checkbox from '../checkbox';
import Switch from '../switch';

import RenderWithProvider from '../../../../__mocks__/with-provider';
import { FormRenderer, componentTypes } from '@data-driven-forms/react-form-renderer';
import FormTemplate from '../form-template';
import componentMapper from '../component-mapper';
import { validatorTypes } from '@data-driven-forms/react-form-renderer';

describe('FormFields', () => {
  const props = {
    name: 'Name of the field',
    id: 'someIdKey',
  };

  it('should render with onText/OffText Switch correctly', () => {
    render(
      <RenderWithProvider>
        <Switch {...props} onText="I am on" offText="Turned off" />
      </RenderWithProvider>
    );

    expect(screen.getByText('I am on')).toHaveClass('pf-m-on');
    expect(screen.getByText('Turned off')).not.toHaveClass('pf-m-on');
  });

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

          it('renders with error and validateOnMount', async () => {
            const errorField = {
              ...field,
              validate: [{ type: validatorTypes.REQUIRED }],
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
            expect(screen.getByText(description)).toBeInTheDocument();
          });

          it('renders with warning and helperText', async () => {
            const errorFields = {
              ...field,
              helperText,
              id: 'warning-field',
              validate: [() => ({ type: 'warning', error: errorText })],
              useWarnings: true,
              validateOnMount: true,
              'aria-label': field.name,
            };

            await act(async () => {
              render(<RendererWrapper schema={{ fields: [errorFields] }} />);
            });

            expect(screen.getByText(errorText)).toBeInTheDocument();
          });

          it('renders isRequired', () => {
            const requiredField = {
              ...field,
              isRequired: true,
            };
            render(<RendererWrapper schema={{ fields: [requiredField] }} />);

            expect(screen.getAllByText('*')).toBeTruthy();
          });

          it('renders isDisabled', () => {
            if (component === componentTypes.SLIDER) {
              return;
            }

            const disabledField = {
              ...field,
              isDisabled: true,
            };
            const { container } = render(<RendererWrapper schema={{ fields: [disabledField] }} />);

            [...container.getElementsByTagName('input')].forEach((el) => expect(el).toBeDisabled());
          });

          it('renders isReadOnly', () => {
            const disabledField = {
              ...field,
              isReadOnly: true,
            };
            const { container } = render(<RendererWrapper schema={{ fields: [disabledField] }} />);

            [...container.getElementsByTagName('input')].forEach((el) => {
              try {
                expect(el).toBeDisabled();
              } catch {
                expect(el).toHaveAttribute('readonly', '');
              }
            });
          });

          it('renders with submit error', async () => {
            render(<RendererWrapper schema={schema} onSubmit={() => ({ [field.name]: errorText })} />);

            await userEvent.click(screen.getByText('Submit'));

            expect(screen.getByText(errorText)).toBeInTheDocument();
          });
        });
      });
    });

    describe('MultipleCheckbox', () => {
      let initialProps;
      beforeEach(() => {
        initialProps = {
          ...initialProps,
          name: 'checkbox',
          options: [
            { label: 'Cat', value: 'cats' },
            { label: 'Dog', value: 'dogs' },
            { label: 'Hamster', value: 'hamsters' },
          ],
        };
      });

      it('renders correctly', () => {
        render(
          <RenderWithProvider>
            <Checkbox {...initialProps} />
          </RenderWithProvider>
        );

        expect(screen.getByText('Cat')).toBeInTheDocument();
        expect(screen.getByText('Dog')).toBeInTheDocument();
        expect(screen.getByText('Hamster')).toBeInTheDocument();
      });

      it('renders with error', async () => {
        const schema = {
          fields: [
            {
              component: componentTypes.CHECKBOX,
              name: 'foo',
              validate: [{ type: validatorTypes.REQUIRED }],
            },
          ],
        };
        render(<RendererWrapper schema={schema} />);

        await userEvent.click(screen.getByText('Submit'));

        expect(screen.getByText(errorText)).toBeInTheDocument();
      });

      it('renders with helperText', () => {
        const schema = {
          fields: [
            {
              component: componentTypes.CHECKBOX,
              name: 'foo',
              helperText,
            },
          ],
        };
        render(<RendererWrapper schema={schema} />);

        expect(screen.getByText(helperText)).toBeInTheDocument();
      });

      it('renders with description', () => {
        const schema = {
          fields: [
            {
              component: componentTypes.CHECKBOX,
              name: 'foo',
              description,
            },
          ],
        };
        render(<RendererWrapper schema={schema} />);

        expect(screen.getByText(description)).toBeInTheDocument();
      });

      it('renders with description and helperText', () => {
        const schema = {
          fields: [
            {
              component: componentTypes.CHECKBOX,
              name: 'foo',
              helperText,
              description,
            },
          ],
        };
        render(<RendererWrapper schema={schema} />);

        expect(screen.getByText(helperText)).toBeInTheDocument();
        expect(screen.getByText(description)).toBeInTheDocument();
      });

      it('renders with error and helperText', async () => {
        const schema = {
          fields: [
            {
              component: componentTypes.CHECKBOX,
              name: 'foo',
              helperText,
              validate: [{ type: validatorTypes.REQUIRED }],
            },
          ],
        };
        render(<RendererWrapper schema={schema} />);

        expect(screen.getByText(helperText)).toBeInTheDocument();

        await userEvent.click(screen.getByText('Submit'));

        expect(() => screen.getByText(helperText)).toThrow();
        expect(screen.getByText(errorText)).toBeInTheDocument();
      });
    });
  });
});
