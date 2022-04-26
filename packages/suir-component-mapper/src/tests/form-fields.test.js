import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FormRenderer, componentTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';
import Checkbox from '../checkbox';

import RenderWithProvider from '../../../../__mocks__/with-provider';
import FormTemplate from '../form-template';
import componentMapper from '../component-mapper';

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

describe('formFields', () => {
  let field;
  let schema;

  const errorText = 'Required';
  const helperText = 'I am helper text';
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

        it('renders with error and helperText', async () => {
          const errorFields = {
            ...field,
            helperText,
            validate: [{ type: validatorTypes.REQUIRED }],
          };
          render(<RendererWrapper schema={{ fields: [errorFields] }} />);

          await userEvent.click(screen.getByText('Submit'));

          expect(screen.getByText(errorText)).toBeInTheDocument();
          expect(screen.getByText(helperText)).toBeInTheDocument();
        });

        it('renders isRequired', () => {
          const requiredField = {
            ...field,
            isRequired: true,
          };
          render(<RendererWrapper schema={{ fields: [requiredField] }} />);

          expect(screen.getByText(field.label).closest('.required')).toBeInTheDocument();
        });

        it('renders isDisabled', () => {
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
        name: 'multiple-checkbox',
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
      expect(screen.getByText(helperText)).toBeInTheDocument();
    });
  });
});
