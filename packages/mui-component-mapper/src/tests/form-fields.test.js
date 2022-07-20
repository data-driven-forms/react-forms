import React from 'react';
import { FormRenderer, componentTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Checkbox from '../checkbox';

import RenderWithProvider from '../../../../__mocks__/with-provider';
import FormTemplate from '../form-template';
import componentMapper from '../component-mapper';

const RendererWrapper = ({ schema = { fields: [] }, ...props }) => (
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <FormRenderer
      onSubmit={jest.fn()}
      FormTemplate={(props) => <FormTemplate {...props} />}
      schema={schema}
      componentMapper={componentMapper}
      subscription={{ submitFailed: true }}
      {...props}
    />
  </LocalizationProvider>
);

describe('formFields', () => {
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

          await userEvent.click(screen.getByText('Submit'));

          expect(screen.getAllByText(errorText)).toBeTruthy();
        });

        it('renders with helperText', async () => {
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

          expect(screen.getByText('*')).toBeInTheDocument();
        });

        it('renders isDisabled', () => {
          const disabledField = {
            ...field,
            isDisabled: true,
            ...([componentTypes.RADIO].includes(field.component) && {
              RadioProps: {
                inputProps: { 'aria-label': field.name },
              },
            }),
            ...([componentTypes.SLIDER].includes(field.component) && {
              'aria-label': field.name,
            }),
            ...(![componentTypes.RADIO, componentTypes.SLIDER, componentTypes.DATE_PICKER, componentTypes.TIME_PICKER].includes(field.component) && {
              inputProps: { 'aria-label': field.name },
            }),
          };

          render(<RendererWrapper schema={{ fields: [disabledField] }} />);

          if (componentTypes.DATE_PICKER === field.component) {
            expect(screen.getAllByLabelText('Choose date')[0]).toBeDisabled();

            return;
          }

          if (componentTypes.TIME_PICKER === field.component) {
            expect(screen.getAllByLabelText('Choose time')[0]).toBeDisabled();

            return;
          }

          expect(screen.getAllByLabelText(field.name)[0]).toBeDisabled();
        });

        it('renders isReadOnly', () => {
          const disabledField = {
            ...field,
            isReadOnly: true,
            ...([componentTypes.RADIO].includes(field.component) && {
              RadioProps: {
                inputProps: { 'aria-label': field.name },
              },
            }),
            ...([componentTypes.SLIDER].includes(field.component) && {
              'aria-label': field.name,
            }),
            ...(![componentTypes.RADIO, componentTypes.SLIDER, componentTypes.DATE_PICKER, componentTypes.TIME_PICKER].includes(field.component) && {
              inputProps: { 'aria-label': field.name },
            }),
          };

          render(<RendererWrapper schema={{ fields: [disabledField] }} />);

          if (componentTypes.DATE_PICKER === field.component) {
            expect(screen.getAllByLabelText('Choose date')[0]).toBeDisabled();

            return;
          }

          if (componentTypes.TIME_PICKER === field.component) {
            expect(screen.getAllByLabelText('Choose time')[0]).toBeDisabled();

            return;
          }

          if (componentTypes.SLIDER === field.component) {
            expect(screen.getAllByLabelText(field.name)[0]).toBeDisabled();

            return;
          }

          expect(screen.getAllByLabelText(field.name)[0]).toHaveAttribute('readonly', '');
        });

        it('renders with submitError', async () => {
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
        name: 'multiple',
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
      expect(() => screen.getByText(description)).toThrow();
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

      await userEvent.click(screen.getByText('Submit'));

      expect(screen.getByText(errorText)).toBeInTheDocument();
    });
  });
});
