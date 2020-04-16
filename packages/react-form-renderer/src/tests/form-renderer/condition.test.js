import React from 'react';
import { mount } from 'enzyme';

import FormTemplate from '../../../../../__mocks__/mock-form-template';
import componentTypes from '../../../dist/cjs/component-types';
import useFieldApi from '../../files/use-field-api';
import FormRenderer from '../../files/form-renderer';

const TextField = (props) => {
  const { input } = useFieldApi(props);
  return <input id={input.name} {...input} />;
};

describe('condition test', () => {
  let initialProps;
  let onSubmit;
  let schema;
  let wrapper;

  beforeEach(() => {
    onSubmit = jest.fn();

    initialProps = {
      FormTemplate,
      componentMapper: {
        [componentTypes.TEXT_FIELD]: TextField
      },
      onSubmit: (values) => onSubmit(values)
    };
  });

  it('should render when condition is fulfill', () => {
    schema = {
      fields: [
        {
          component: componentTypes.TEXT_FIELD,
          name: 'field-1'
        },
        {
          component: componentTypes.TEXT_FIELD,
          name: 'field-2',
          condition: [
            {
              when: 'field-1',
              is: 'show'
            }
          ]
        }
      ]
    };

    wrapper = mount(<FormRenderer {...initialProps} schema={schema} />);

    expect(wrapper.find('input')).toHaveLength(1);

    wrapper.find('input').simulate('change', { target: { value: 'show' } });
    wrapper.update();

    expect(wrapper.find('input')).toHaveLength(2);

    wrapper
      .find('input')
      .first()
      .simulate('change', { target: { value: 'dontshow' } });
    wrapper.update();

    expect(wrapper.find('input')).toHaveLength(1);
  });

  it('sets value when condition is fulfill', () => {
    schema = {
      fields: [
        {
          component: componentTypes.TEXT_FIELD,
          name: 'field-1'
        },
        {
          component: componentTypes.TEXT_FIELD,
          name: 'field-2',
          condition: {
            when: 'field-1',
            is: 'show',
            then: {
              set: {
                'field-2': 'someValue'
              }
            }
          }
        }
      ]
    };

    wrapper = mount(<FormRenderer {...initialProps} schema={schema} />);

    expect(wrapper.find('input')).toHaveLength(1);

    wrapper.find('input').simulate('change', { target: { value: 'show' } });
    wrapper.update();

    expect(wrapper.find('input')).toHaveLength(2);

    wrapper.find('form').simulate('submit');

    expect(onSubmit).toHaveBeenCalledWith({
      'field-1': 'show',
      'field-2': 'someValue'
    });
  });

  it('sets value when condition is fulfill - initialValues', () => {
    schema = {
      fields: [
        {
          component: componentTypes.TEXT_FIELD,
          name: 'field-1'
        },
        {
          component: componentTypes.TEXT_FIELD,
          name: 'field-2',
          condition: {
            when: 'field-1',
            is: 'show',
            then: {
              set: {
                'field-2': 'someValue'
              }
            }
          }
        }
      ]
    };

    wrapper = mount(<FormRenderer {...initialProps} schema={schema} initialValues={{ 'field-1': 'show' }} />);

    expect(wrapper.find('input')).toHaveLength(2);

    wrapper.find('form').simulate('submit');

    expect(onSubmit).toHaveBeenCalledWith({
      'field-1': 'show',
      'field-2': 'someValue'
    });
  });

  it('sets value when condition is fulfill on reset', () => {
    schema = {
      fields: [
        {
          component: componentTypes.TEXT_FIELD,
          name: 'field-1'
        },
        {
          component: componentTypes.TEXT_FIELD,
          name: 'field-2',
          condition: {
            when: 'field-1',
            is: 'show',
            then: {
              set: {
                'field-2': 'someValue'
              }
            }
          }
        }
      ]
    };

    wrapper = mount(<FormRenderer {...initialProps} schema={schema} initialValues={{ 'field-1': 'show' }} />);

    expect(wrapper.find('input')).toHaveLength(2);

    wrapper
      .find('input')
      .first()
      .simulate('change', { target: { value: 'dontshow' } });
    wrapper.update();

    expect(wrapper.find('input')).toHaveLength(1);

    wrapper.find('form').simulate('submit');

    expect(onSubmit).toHaveBeenCalledWith({
      'field-1': 'dontshow',
      'field-2': 'someValue'
    });

    //Reset
    wrapper
      .find('button')
      .at(1)
      .simulate('click');
    wrapper.update();

    wrapper.find('form').simulate('submit');

    expect(onSubmit).toHaveBeenCalledWith({
      'field-1': 'show',
      'field-2': 'someValue'
    });
  });

  it('sets value when condition is fulfill - sequence', () => {
    schema = {
      fields: [
        {
          component: componentTypes.TEXT_FIELD,
          name: 'field-1'
        },
        {
          component: componentTypes.TEXT_FIELD,
          name: 'field-2',
          condition: {
            sequence: [
              {
                when: 'field-1',
                is: 'show',
                then: {
                  set: {
                    'field-2': 'someValue',
                    'field-3': 'someValue3'
                  }
                }
              },
              {
                when: 'field-1',
                is: 'not',
                then: {
                  set: {
                    'field-4': 'someValue4'
                  }
                }
              },
              {
                when: 'field-1',
                is: 'show',
                then: {
                  set: {
                    'field-5': 'someValuu5'
                  }
                }
              }
            ]
          }
        }
      ]
    };

    wrapper = mount(<FormRenderer {...initialProps} schema={schema} />);

    expect(wrapper.find('input')).toHaveLength(1);

    wrapper.find('input').simulate('change', { target: { value: 'show' } });
    wrapper.update();

    wrapper.find('form').simulate('submit');

    expect(onSubmit).toHaveBeenCalledWith({
      'field-1': 'show',
      'field-2': 'someValue',
      'field-3': 'someValue3',
      'field-5': 'someValuu5'
    });
  });
});
