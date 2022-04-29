import React, { Fragment } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import useField from '../../use-field';
import useFieldArray from '../../use-field-array';
import FormStateManager from '../../form-state-manager';

const DummyInput = (props) => {
  const { input, meta } = useField({ ...props });
  return <input {...input} placeholder={input.name} />;
};

const CompositeDummyInput = ({ name, ...props }) => {
  const firstField = useField({ ...props, name: `${name}.first-field` });
  const secondField = useField({ ...props, name: `${name}.second-field` });
  return (
    <Fragment>
      <input {...firstField.input} placeholder={firstField.input.name} />
      <input {...secondField.input} placeholder={secondField.input.name} />
    </Fragment>
  );
};

let lastValue;

const DummyArrayHookSpy = ({ push, remove, pop, shift, update, move, swap, unshift, insert, concat, removeBatch }) => (
  <Fragment>
    <button type="button" onClick={() => push()}>
      push
    </button>
    <button type="button" onClick={() => push('initial value')}>
      push with initial value
    </button>
    <button type="button" onClick={() => remove(1)}>
      remove second
    </button>
    <button
      type="button"
      onClick={() => {
        lastValue = pop();
      }}
    >
      pop
    </button>
    <button
      type="button"
      onClick={() => {
        lastValue = shift();
      }}
    >
      shift
    </button>
    <button type="button" onClick={() => update(0, 'new-value')}>
      update
    </button>
    <button type="button" onClick={() => move(3, 1)}>
      move
    </button>
    <button type="button" onClick={() => swap(1, 3)}>
      swap
    </button>
    <button type="button" onClick={() => unshift('one')}>
      unshift one
    </button>
    <button type="button" onClick={() => unshift('two')}>
      unshift two
    </button>
    <button type="button" onClick={() => insert(1)}>
      insert empty
    </button>
    <button type="button" onClick={() => insert(2, 'new-value')}>
      insert value
    </button>
    <button type="button" onClick={() => concat(['two', 'three'])}>
      concat
    </button>
    <button type="button" onClick={() => removeBatch([0, 2])}>
      remove batch
    </button>
  </Fragment>
);

const DummyArray = ({ compositeField, ...props }) => {
  const hookValue = useFieldArray(props);
  const {
    fields: { map, value },
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
      render(
        <FormStateManager>
          {() => (
            <Fragment>
              <DummyArray name="simple-array" initialValue={['one', 'two']} />
            </Fragment>
          )}
        </FormStateManager>
      );

      expect(screen.getByPlaceholderText('simple-array[0]')).toHaveValue('one');
      expect(screen.getByPlaceholderText('simple-array[1]')).toHaveValue('two');
    });

    it('should render 2 composite inputs', () => {
      render(
        <FormStateManager>
          {() => (
            <Fragment>
              <DummyArray
                name="composite-array"
                compositeField
                initialValue={[
                  { 'first-field': 'one-first', 'second-field': 'one-second' },
                  { 'first-field': 'two-first', 'second-field': 'two-second' },
                ]}
              />
            </Fragment>
          )}
        </FormStateManager>
      );

      expect(screen.getByPlaceholderText('composite-array[0].first-field')).toHaveValue('one-first');
      expect(screen.getByPlaceholderText('composite-array[0].second-field')).toHaveValue('one-second');
      expect(screen.getByPlaceholderText('composite-array[1].first-field')).toHaveValue('two-first');
      expect(screen.getByPlaceholderText('composite-array[1].second-field')).toHaveValue('two-second');
    });

    it('should use empty array if field array has no value', () => {
      render(<FormStateManager>{() => <DummyArray name="empty-array" compositeField />}</FormStateManager>);

      expect(() => screen.getByRole('textbox')).toThrow();
    });
  });

  describe('fieldArray api methods', () => {
    it('should push new field to the end of the field array with no value', async () => {
      render(<FormStateManager>{() => <DummyArray name="push-array" />}</FormStateManager>);

      expect(() => screen.getByRole('textbox')).toThrow();

      await userEvent.click(screen.getByText('push'));

      expect(screen.getByRole('textbox')).toHaveValue('');
    });

    it('should push new field to the end of the field array with initial value', async () => {
      render(<FormStateManager>{() => <DummyArray name="push-array" />}</FormStateManager>);

      expect(() => screen.getByRole('textbox')).toThrow();

      await userEvent.click(screen.getByText('push with initial value'));

      expect(screen.getByRole('textbox')).toHaveValue('initial value');
    });

    it('should remove middle field from field array and set correct value', async () => {
      render(
        <FormStateManager initialValues={{ 'remove-array': ['one', 'two', 'three'] }}>{() => <DummyArray name="remove-array" />}</FormStateManager>
      );
      expect(screen.getAllByRole('textbox')).toHaveLength(3);

      expect(screen.getAllByRole('textbox')[0]).toHaveValue('one');
      expect(screen.getAllByRole('textbox')[1]).toHaveValue('two');
      expect(screen.getAllByRole('textbox')[2]).toHaveValue('three');

      await userEvent.click(screen.getByText('remove second'));

      expect(screen.getAllByRole('textbox')).toHaveLength(2);
      expect(screen.getAllByRole('textbox')[0]).toHaveValue('one');
      expect(screen.getAllByRole('textbox')[1]).toHaveValue('three');
    });

    it('should pop the last field array field', async () => {
      render(<FormStateManager initialValues={{ 'pop-array': ['one', 'two'] }}>{() => <DummyArray name="pop-array" />}</FormStateManager>);

      await userEvent.click(screen.getByText('pop'));

      expect(screen.getAllByRole('textbox')).toHaveLength(1);
      expect(screen.getAllByRole('textbox')[0]).toHaveValue('one');

      expect(lastValue).toEqual('two');
    });

    it('should shift the first field array field', async () => {
      render(<FormStateManager initialValues={{ 'shift-array': ['one', 'two'] }}>{() => <DummyArray name="shift-array" />}</FormStateManager>);

      await userEvent.click(screen.getByText('shift'));

      expect(screen.getAllByRole('textbox')).toHaveLength(1);
      expect(screen.getAllByRole('textbox')[0]).toHaveValue('two');

      expect(lastValue).toEqual('one');
    });

    it('should update the first field value in field array', async () => {
      render(<FormStateManager initialValues={{ 'update-array': ['one', 'two'] }}>{() => <DummyArray name="update-array" />}</FormStateManager>);

      await userEvent.click(screen.getByText('update'));

      expect(screen.getAllByRole('textbox')).toHaveLength(2);
      expect(screen.getAllByRole('textbox')[0]).toHaveValue('new-value');
      expect(screen.getAllByRole('textbox')[1]).toHaveValue('two');
    });

    it('should move the fourh field to second place', async () => {
      render(
        <FormStateManager initialValues={{ 'move-array': ['one', 'two', 'three', 'four'] }}>
          {() => <DummyArray name="move-array" />}
        </FormStateManager>
      );

      await userEvent.click(screen.getByText('move'));

      expect(screen.getAllByRole('textbox')).toHaveLength(4);
      expect(screen.getAllByRole('textbox')[0]).toHaveValue('one');
      expect(screen.getAllByRole('textbox')[1]).toHaveValue('four');
      expect(screen.getAllByRole('textbox')[2]).toHaveValue('two');
      expect(screen.getAllByRole('textbox')[3]).toHaveValue('three');
    });

    it('should swap the fourh and second field', async () => {
      render(
        <FormStateManager initialValues={{ 'move-array': ['one', 'two', 'three', 'four'] }}>
          {() => <DummyArray name="move-array" />}
        </FormStateManager>
      );

      await userEvent.click(screen.getByText('swap'));

      expect(screen.getAllByRole('textbox')).toHaveLength(4);
      expect(screen.getAllByRole('textbox')[0]).toHaveValue('one');
      expect(screen.getAllByRole('textbox')[1]).toHaveValue('four');
      expect(screen.getAllByRole('textbox')[2]).toHaveValue('three');
      expect(screen.getAllByRole('textbox')[3]).toHaveValue('two');
    });

    it('should add two fields to the start of the array', async () => {
      render(<FormStateManager>{() => <DummyArray name="unshift-array" />}</FormStateManager>);

      await userEvent.click(screen.getByText('unshift one'));
      await userEvent.click(screen.getByText('unshift two'));

      expect(screen.getAllByRole('textbox')).toHaveLength(2);
      expect(screen.getAllByRole('textbox')[0]).toHaveValue('two');
      expect(screen.getAllByRole('textbox')[1]).toHaveValue('one');
    });

    it('should insert field into the middle of an field array', async () => {
      render(<FormStateManager initialValues={{ 'insert-array': ['one', 'two'] }}>{() => <DummyArray name="insert-array" />}</FormStateManager>);

      await userEvent.click(screen.getByText('insert empty'));
      await userEvent.click(screen.getByText('insert value'));

      expect(screen.getAllByRole('textbox')).toHaveLength(4);
      expect(screen.getAllByRole('textbox')[0]).toHaveValue('one');
      expect(screen.getAllByRole('textbox')[1]).toHaveValue('');
      expect(screen.getAllByRole('textbox')[2]).toHaveValue('new-value');
      expect(screen.getAllByRole('textbox')[3]).toHaveValue('two');
    });

    it('should concat an array to the end of the field array', async () => {
      render(<FormStateManager>{() => <DummyArray name="concat-array" initialValue={['one']} />}</FormStateManager>);

      await userEvent.click(screen.getByText('concat'));

      expect(screen.getAllByRole('textbox')).toHaveLength(3);
      expect(screen.getAllByRole('textbox')[0]).toHaveValue('one');
      expect(screen.getAllByRole('textbox')[1]).toHaveValue('two');
      expect(screen.getAllByRole('textbox')[2]).toHaveValue('three');
    });

    it('should remove multiple fields from field array', async () => {
      render(<FormStateManager>{() => <DummyArray name="removeBatch-array" initialValue={['one', 'two', 'three']} />}</FormStateManager>);
      expect(screen.getAllByRole('textbox')).toHaveLength(3);

      await userEvent.click(screen.getByText('remove batch'));

      expect(screen.getAllByRole('textbox')).toHaveLength(1);
      expect(screen.getAllByRole('textbox')[0]).toHaveValue('two');
    });
  });
});
