import React, { Fragment } from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import useField from '../../files/use-field';
import useFieldArray from '../../files/use-field-array';
import FormStateManager from '../../files/form-state-manager';

const DummyInput = (props) => {
  const { input, meta } = useField({ ...props });
  return <input {...input} />;
};

const CompositeDummyInput = ({ name, ...props }) => {
  const firstField = useField({ ...props, name: `${name}.first-field` });
  const secondField = useField({ ...props, name: `${name}.second-field` });
  return (
    <Fragment>
      <input {...firstField.input} />
      <input {...secondField.input} />
    </Fragment>
  );
};

const DummyArrayHookSpy = () => Fragment;

const DummyArray = ({ compositeField, ...props }) => {
  const hookValue = useFieldArray(props);
  const {
    fields: { map, value }
  } = hookValue;
  const Component = compositeField ? CompositeDummyInput : DummyInput;
  return (
    <Fragment>
      <DummyArrayHookSpy {...hookValue.fields} />
      {map((name) => (
        <Component key={name} name={name} />
      ))}
    </Fragment>
  );
};

describe('useFieldArray', () => {
  describe('basic API', () => {
    it('should render 2 simple array inputs', () => {
      const wrapper = mount(
        <FormStateManager>
          {() => (
            <Fragment>
              <DummyArray name="simple-array" initialValue={['one', 'two']} />
            </Fragment>
          )}
        </FormStateManager>
      );
      expect(wrapper.find('input')).toHaveLength(2);
      expect(
        wrapper
          .find('input')
          .at(0)
          .prop('name')
      ).toEqual('simple-array[0]');
      expect(
        wrapper
          .find('input')
          .at(1)
          .prop('name')
      ).toEqual('simple-array[1]');
      expect(wrapper.find(DummyArrayHookSpy).prop('value')).toEqual(['one', 'two']);
    });

    it('should render 2 composite inputs', () => {
      const wrapper = mount(
        <FormStateManager>
          {() => (
            <Fragment>
              <DummyArray
                name="composite-array"
                compositeField
                initialValue={[
                  { 'first-field': 'one-first', 'second-field': 'one-second' },
                  { 'first-field': 'two-first', 'second-field': 'two-second' }
                ]}
              />
            </Fragment>
          )}
        </FormStateManager>
      );
      expect(wrapper.find('input')).toHaveLength(4);
      expect(
        wrapper
          .find('input')
          .at(0)
          .prop('name')
      ).toEqual('composite-array[0].first-field');
      expect(
        wrapper
          .find('input')
          .at(1)
          .prop('name')
      ).toEqual('composite-array[0].second-field');
      expect(
        wrapper
          .find('input')
          .at(2)
          .prop('name')
      ).toEqual('composite-array[1].first-field');
      expect(
        wrapper
          .find('input')
          .at(3)
          .prop('name')
      ).toEqual('composite-array[1].second-field');
      expect(wrapper.find(DummyArrayHookSpy).prop('value')).toEqual([
        { 'first-field': 'one-first', 'second-field': 'one-second' },
        { 'first-field': 'two-first', 'second-field': 'two-second' }
      ]);
    });

    it('should pass correct field name as argument to fields.forEach function', () => {
      const wrapper = mount(
        <FormStateManager>
          {() => (
            <Fragment>
              <DummyArray
                name="name-array"
                compositeField
                initialValue={[
                  { 'first-field': 'one-first', 'second-field': 'one-second' },
                  { 'first-field': 'two-first', 'second-field': 'two-second' }
                ]}
              />
            </Fragment>
          )}
        </FormStateManager>
      );

      wrapper.find(DummyArrayHookSpy).prop('forEach')((name, index) => {
        expect(name).toEqual(`name-array[${index}]`);
      });
    });

    it('should use empty array if field array has no value', () => {
      const wrapper = mount(<FormStateManager>{() => <DummyArray name="empty-array" compositeField />}</FormStateManager>);
      expect(wrapper.find('input')).toHaveLength(0);
      expect(wrapper.find(DummyArrayHookSpy).prop('value')).toBeFalsy();
    });
  });

  describe('fieldArray api methods', () => {
    it('should push new field to the end of the field array with no value', () => {
      const wrapper = mount(<FormStateManager>{() => <DummyArray name="push-array" />}</FormStateManager>);
      expect(wrapper.find('input')).toHaveLength(0);
      expect(wrapper.find(DummyArrayHookSpy).prop('value')).toBeFalsy();
      act(() => {
        wrapper.find(DummyArrayHookSpy).prop('push')();
      });
      wrapper.update();
      expect(wrapper.find('input')).toHaveLength(1);
      expect(wrapper.find('input').prop('value')).toEqual('');
      expect(wrapper.find(DummyArrayHookSpy).prop('value')).toEqual([undefined]);
    });

    it('should push new field to the end of the field array with initial value', async () => {
      const wrapper = mount(<FormStateManager>{() => <DummyArray name="push-array" />}</FormStateManager>);
      expect(wrapper.find('input')).toHaveLength(0);
      expect(wrapper.find(DummyArrayHookSpy).prop('value')).toBeFalsy();
      await act(async () => {
        wrapper.find(DummyArrayHookSpy).prop('push')('new-value');
      });
      await act(async () => {
        wrapper.update();
      });
      expect(wrapper.find('input')).toHaveLength(1);
      expect(wrapper.find(DummyArrayHookSpy).prop('value')).toEqual(['new-value']);
      expect(wrapper.find('input').prop('value')).toEqual('new-value');
    });

    it('should remove middle field from field array and set correct value', () => {
      const wrapper = mount(
        <FormStateManager initialValues={{ 'remove-array': ['one', 'two', 'three'] }}>{() => <DummyArray name="remove-array" />}</FormStateManager>
      );
      expect(wrapper.find('input')).toHaveLength(3);
      expect(
        wrapper
          .find('input')
          .at(0)
          .prop('value')
      ).toEqual('one');
      expect(
        wrapper
          .find('input')
          .at(1)
          .prop('value')
      ).toEqual('two');
      expect(
        wrapper
          .find('input')
          .at(2)
          .prop('value')
      ).toEqual('three');
      /**
       * remove second field
       */
      act(() => {
        wrapper.find(DummyArrayHookSpy).prop('remove')(1);
      });
      wrapper.update();

      expect(wrapper.find('input')).toHaveLength(2);
      expect(
        wrapper
          .find('input')
          .at(0)
          .prop('value')
      ).toEqual('one');
      expect(
        wrapper
          .find('input')
          .at(1)
          .prop('value')
      ).toEqual('three');
      expect(wrapper.find(DummyArrayHookSpy).prop('value')).toEqual(['one', 'three']);
    });

    it('should pop the last field array field', () => {
      const wrapper = mount(
        <FormStateManager initialValues={{ 'pop-array': ['one', 'two'] }}>{() => <DummyArray name="pop-array" />}</FormStateManager>
      );
      let lastValue;
      /**
       * pop last field
       */
      act(() => {
        lastValue = wrapper.find(DummyArrayHookSpy).prop('pop')();
      });
      wrapper.update();

      expect(wrapper.find('input')).toHaveLength(1);
      expect(wrapper.find('input').prop('value')).toEqual('one');
      expect(lastValue).toEqual('two');
    });

    it('should shift the first field array field', () => {
      const wrapper = mount(
        <FormStateManager initialValues={{ 'shift-array': ['one', 'two'] }}>{() => <DummyArray name="shift-array" />}</FormStateManager>
      );
      let lastValue;
      /**
       * shift first field
       */
      act(() => {
        lastValue = wrapper.find(DummyArrayHookSpy).prop('shift')();
      });
      wrapper.update();

      expect(wrapper.find('input')).toHaveLength(1);
      expect(wrapper.find('input').prop('value')).toEqual('two');
      expect(lastValue).toEqual('one');
    });

    it('should update the first field value in field array', () => {
      const wrapper = mount(
        <FormStateManager initialValues={{ 'update-array': ['one', 'two'] }}>{() => <DummyArray name="update-array" />}</FormStateManager>
      );
      /**
       * update first field
       */
      act(() => {
        wrapper.find(DummyArrayHookSpy).prop('update')(0, 'new-value');
      });
      wrapper.update();

      expect(wrapper.find('input')).toHaveLength(2);
      expect(
        wrapper
          .find('input')
          .at(0)
          .prop('value')
      ).toEqual('new-value');
    });

    it('should move the fourh field to second place', () => {
      const wrapper = mount(
        <FormStateManager initialValues={{ 'move-array': ['one', 'two', 'three', 'four'] }}>
          {() => <DummyArray name="move-array" />}
        </FormStateManager>
      );
      /**
       * move last field to second place
       */
      act(() => {
        wrapper.find(DummyArrayHookSpy).prop('move')(3, 1);
      });
      wrapper.update();

      expect(wrapper.find('input')).toHaveLength(4);
      expect(
        wrapper
          .find('input')
          .at(0)
          .prop('value')
      ).toEqual('one');
      expect(
        wrapper
          .find('input')
          .at(1)
          .prop('value')
      ).toEqual('four');
      expect(
        wrapper
          .find('input')
          .at(2)
          .prop('value')
      ).toEqual('two');
      expect(
        wrapper
          .find('input')
          .at(3)
          .prop('value')
      ).toEqual('three');
      expect(wrapper.find(DummyArrayHookSpy).prop('value')).toEqual(['one', 'four', 'two', 'three']);
    });

    it('should swap the fourh and second field', () => {
      const wrapper = mount(
        <FormStateManager initialValues={{ 'move-array': ['one', 'two', 'three', 'four'] }}>
          {() => <DummyArray name="move-array" />}
        </FormStateManager>
      );
      /**
       * swap fourth and second field
       */
      act(() => {
        wrapper.find(DummyArrayHookSpy).prop('swap')(1, 3);
      });
      wrapper.update();

      expect(wrapper.find('input')).toHaveLength(4);
      expect(
        wrapper
          .find('input')
          .at(0)
          .prop('value')
      ).toEqual('one');
      expect(
        wrapper
          .find('input')
          .at(1)
          .prop('value')
      ).toEqual('four');
      expect(
        wrapper
          .find('input')
          .at(2)
          .prop('value')
      ).toEqual('three');
      expect(
        wrapper
          .find('input')
          .at(3)
          .prop('value')
      ).toEqual('two');
      expect(wrapper.find(DummyArrayHookSpy).prop('value')).toEqual(['one', 'four', 'three', 'two']);
    });

    it('should add two fields to the start of the array', () => {
      const wrapper = mount(<FormStateManager>{() => <DummyArray name="unshift-array" />}</FormStateManager>);

      act(() => {
        wrapper.find(DummyArrayHookSpy).prop('unshift')('one');
      });
      wrapper.update();

      act(() => {
        wrapper.find(DummyArrayHookSpy).prop('unshift')('two');
      });
      wrapper.update();

      expect(wrapper.find(DummyArrayHookSpy).prop('value')).toEqual(['two', 'one']);
      expect(wrapper.find('input')).toHaveLength(2);
      expect(
        wrapper
          .find('input')
          .at(0)
          .prop('value')
      ).toEqual('two');
      expect(
        wrapper
          .find('input')
          .at(1)
          .prop('value')
      ).toEqual('one');
    });

    it('should insert field into the middle of an field array', () => {
      const wrapper = mount(
        <FormStateManager initialValues={{ 'insert-array': ['one', 'two'] }}>{() => <DummyArray name="insert-array" />}</FormStateManager>
      );
      /**
       * insert value
       */
      act(() => {
        wrapper.find(DummyArrayHookSpy).prop('insert')(1);
      });
      wrapper.update();

      act(() => {
        wrapper.find(DummyArrayHookSpy).prop('insert')(2, 'new-value');
      });
      wrapper.update();

      expect(wrapper.find('input')).toHaveLength(4);
      expect(
        wrapper
          .find('input')
          .at(0)
          .prop('value')
      ).toEqual('one');
      expect(
        wrapper
          .find('input')
          .at(1)
          .prop('value')
      ).toEqual('');
      expect(
        wrapper
          .find('input')
          .at(2)
          .prop('value')
      ).toEqual('new-value');
      expect(
        wrapper
          .find('input')
          .at(3)
          .prop('value')
      ).toEqual('two');
    });

    it('should concat an array to the end of the field array', () => {
      const wrapper = mount(<FormStateManager>{() => <DummyArray name="concat-array" initialValue={['one']} />}</FormStateManager>);
      expect(wrapper.find('input')).toHaveLength(1);
      act(() => {
        wrapper.find(DummyArrayHookSpy).prop('concat')(['two', 'three']);
      });
      wrapper.update();
      expect(wrapper.find('input')).toHaveLength(3);
      expect(
        wrapper
          .find('input')
          .at(0)
          .prop('value')
      ).toEqual('one');
      expect(
        wrapper
          .find('input')
          .at(1)
          .prop('value')
      ).toEqual('two');
      expect(
        wrapper
          .find('input')
          .at(2)
          .prop('value')
      ).toEqual('three');
      expect(wrapper.find(DummyArrayHookSpy).prop('value')).toEqual(['one', 'two', 'three']);
    });

    it('should remove multiple fields from field array', () => {
      const wrapper = mount(
        <FormStateManager>{() => <DummyArray name="removeBatch-array" initialValue={['one', 'two', 'three']} />}</FormStateManager>
      );
      expect(wrapper.find('input')).toHaveLength(3);
      act(() => {
        wrapper.find(DummyArrayHookSpy).prop('removeBatch')([0, 2]);
      });
      wrapper.update();
      expect(wrapper.find('input')).toHaveLength(1);
      expect(
        wrapper
          .find('input')
          .at(0)
          .prop('value')
      ).toEqual('two');
      expect(wrapper.find(DummyArrayHookSpy).prop('value')).toEqual(['two']);
    });
  });
});
