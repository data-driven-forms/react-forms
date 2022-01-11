import React from 'react';
import {mount} from 'enzyme';
import {act} from 'react-dom/test-utils';

import FormTemplate from '../../../../../__mocks__/mock-form-template';
import componentTypes from '../../../dist/cjs/component-types';
import useFieldApi from '../../files/use-field-api';
import FormRenderer from '../../files/form-renderer';

import {reducer} from '../../form-renderer/condition';

const TextField = props => {
  const {input} = useFieldApi(props);
  return <input id={input.name} {...input} />;
};

describe('condition test', () => {
  let initialProps;
  let onSubmit;
  let schema;
  let wrapper;

  beforeEach(() => {
    jest.useFakeTimers();

    onSubmit = jest.fn();

    initialProps = {
      FormTemplate,
      componentMapper: {
        [componentTypes.TEXT_FIELD]: TextField,
      },
      onSubmit: values => onSubmit(values),
    };
  });

  it('should render when condition is fulfill', () => {
    //Testing both legacy condition and new condition style
    schema = {
      fields: [
        {
          component: componentTypes.TEXT_FIELD,
          name: 'field-1',
        },
        {
          component: componentTypes.TEXT_FIELD,
          name: 'field-2',
          condition: [
            {
              when: 'field-1',
              is: 'show',
            },
          ],
        },
        {
          component: componentTypes.TEXT_FIELD,
          name: 'field-3',
          hideField: true,
        },
      ],
      conditions: {
        cond1: {
          when: 'field-1',
          is: 'show',
          then: {
            'field-3': {visible: true},
          },
        },
      },
    };

    wrapper = mount(<FormRenderer {...initialProps} schema={schema} />);

    expect(wrapper.find('input')).toHaveLength(1);

    wrapper.find('input').simulate('change', {target: {value: 'show'}});
    wrapper.update();

    expect(wrapper.find('input')).toHaveLength(3);

    wrapper
      .find('input')
      .first()
      .simulate('change', {target: {value: 'dontshow'}});
    wrapper.update();

    expect(wrapper.find('input')).toHaveLength(1);
  });

  it('sets value when condition is fulfill', async () => {
    schema = {
      fields: [
        {
          component: componentTypes.TEXT_FIELD,
          name: 'field-1',
        },
        {
          component: componentTypes.TEXT_FIELD,
          name: 'field-2',
          condition: {
            when: 'field-1',
            is: 'legacy',
            then: {
              set: {
                'field-2': 'someValue',
              },
            },
          },
        },
        {
          component: componentTypes.TEXT_FIELD,
          name: 'field-3',
        },
      ],
      conditions: {
        cond1: {
          when: 'field-1',
          is: 'show',
          then: {
            'field-3': {
              set: 'otherValue',
            },
          },
        },
      },
    };

    await act(async () => {
      wrapper = mount(<FormRenderer {...initialProps} schema={schema} />);
    });
    wrapper.update();

    expect(wrapper.find('input')).toHaveLength(2);

    await act(async () => {
      wrapper.find('input').simulate('change', {target: {value: 'show'}});
      jest.advanceTimersByTime(1);
    });
    wrapper.update();

    expect(wrapper.find('input')).toHaveLength(3);

    await act(async () => {
      wrapper.find('form').simulate('submit');
      jest.advanceTimersByTime(1);
    });
    wrapper.update();

    expect(onSubmit).toHaveBeenCalledWith({
      'field-1': 'show',
      'field-2': 'someValue',
      'field-3': 'otherValue',
    });
  });

  it('sets value when condition is fulfill - initialValues', async () => {
    schema = {
      fields: [
        {
          component: componentTypes.TEXT_FIELD,
          name: 'field-1',
        },
        {
          component: componentTypes.TEXT_FIELD,
          name: 'field-2',
          condition: {
            when: 'field-1',
            is: 'show',
            then: {
              set: {
                'field-2': 'someValue',
              },
            },
          },
        },
      ],
    };

    await act(async () => {
      wrapper = mount(
        <FormRenderer {...initialProps} schema={schema} initialValues={{'field-1': 'show'}} />
      );
      jest.advanceTimersByTime(1);
    });
    wrapper.update();

    expect(wrapper.find('input')).toHaveLength(2);

    await act(async () => {
      wrapper.find('form').simulate('submit');
    });
    wrapper.update();

    expect(onSubmit).toHaveBeenCalledWith({
      'field-1': 'show',
      'field-2': 'someValue',
    });
  });

  it('sets value when condition is fulfill on reset', async () => {
    schema = {
      fields: [
        {
          component: componentTypes.TEXT_FIELD,
          name: 'field-1',
        },
        {
          component: componentTypes.TEXT_FIELD,
          name: 'field-2',
          condition: {
            when: 'field-1',
            is: 'show',
            then: {
              set: {
                'field-2': 'someValue',
              },
            },
          },
        },
      ],
    };

    await act(async () => {
      wrapper = mount(
        <FormRenderer {...initialProps} schema={schema} initialValues={{'field-1': 'show'}} />
      );
      jest.advanceTimersByTime(1);
    });
    wrapper.update();

    expect(wrapper.find('input')).toHaveLength(2);

    await act(async () => {
      wrapper
        .find('input')
        .first()
        .simulate('change', {target: {value: 'dontshow'}});
      jest.advanceTimersByTime(1);
    });
    wrapper.update();

    expect(wrapper.find('input')).toHaveLength(1);

    await act(async () => {
      wrapper.find('form').simulate('submit');
    });
    wrapper.update();

    expect(onSubmit).toHaveBeenCalledWith({
      'field-1': 'dontshow',
      'field-2': 'someValue',
    });
    onSubmit.mockClear();

    await act(async () => {
      //Reset
      wrapper
        .find('button')
        .at(1)
        .simulate('click');
      jest.advanceTimersByTime(1);
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('form').simulate('submit');
    });
    wrapper.update();

    expect(onSubmit).toHaveBeenCalledWith({
      'field-1': 'show',
      'field-2': 'someValue',
    });
  });

  // it('sets value when condition is fulfill - sequence', async () => {
  //   schema = {
  //     fields: [
  //       {
  //         component: componentTypes.TEXT_FIELD,
  //         name: 'field-1',
  //       },
  //       {
  //         component: componentTypes.TEXT_FIELD,
  //         name: 'field-2',
  //         condition: {
  //           sequence: [
  //             {
  //               when: 'field-1',
  //               is: 'show',
  //               then: {
  //                 set: {
  //                   'field-2': 'someValue',
  //                   'field-3': 'someValue3',
  //                 },
  //               },
  //             },
  //             {
  //               when: 'field-1',
  //               is: 'not',
  //               then: {
  //                 set: {
  //                   'field-4': 'someValue4',
  //                 },
  //               },
  //             },
  //             {
  //               when: 'field-1',
  //               is: 'show',
  //               then: {
  //                 set: {
  //                   'field-5': 'someValuu5',
  //                 },
  //               },
  //             },
  //           ],
  //         },
  //       },
  //     ],
  //   };

  //   await act(async () => {
  //     wrapper = mount(<FormRenderer {...initialProps} schema={schema} />);
  //   });

  //   expect(wrapper.find('input')).toHaveLength(1);

  //   await act(async () => {
  //     wrapper.find('input').simulate('change', {target: {value: 'show'}});
  //     jest.advanceTimersByTime(1);
  //   });
  //   wrapper.update();

  //   await act(async () => {
  //     wrapper.find('form').simulate('submit');
  //   });
  //   wrapper.update();

  //   expect(onSubmit).toHaveBeenCalledWith({
  //     'field-1': 'show',
  //     'field-2': 'someValue',
  //     'field-3': 'someValue3',
  //     'field-5': 'someValuu5',
  //   });
  // });

  // describe('reducer', () => {
  //   it('returns default', () => {
  //     const initialState = {
  //       a: 'bb',
  //     };

  //     expect(reducer(initialState, {type: 'nonsesne'})).toEqual(initialState);
  //   });
  // });
});
