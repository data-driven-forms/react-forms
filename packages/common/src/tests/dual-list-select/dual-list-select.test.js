/* eslint-disable react/prop-types */
import React from 'react';
import { act } from 'react-dom/test-utils';
import { FormRenderer, componentTypes } from '@data-driven-forms/react-form-renderer';
import { mount } from 'enzyme';

import DualListSelectCommon from '../../dual-list-select';

describe('dual list select', () => {
  let state;
  let wrapper;

  const spyState = (newState) => {
    state = newState;
  };

  const event = { preventDefault: jest.fn() };

  const Dummy = ({
    leftValues,
    rightValues,
    handleOptionsClick,
    handleValuesClick,
    handleMoveRight,
    handleMoveLeft,
    sortOptions,
    sortValues,
    filterOptions,
    filterValues,
    handleClearLeftValues,
    handleClearRightValues,
    state,
    input: { value },
  }) => {
    spyState({ ...state, leftValues, rightValues, value });

    return (
      <React.Fragment>
        <button id="handleOptionsClick" onClick={handleOptionsClick} />
        <button id="handleValuesClick" onClick={handleValuesClick} />
        <button id="handleMoveRight" onClick={handleMoveRight} />
        <button id="handleMoveLeft" onClick={handleMoveLeft} />
        <button id="sortOptions" onClick={sortOptions} />
        <button id="sortValues" onClick={sortValues} />
        <button id="filterOptions" onClick={filterOptions} />
        <button id="filterValues" onClick={filterValues} />
        <button id="handleClearLeftValues" onClick={handleClearLeftValues} />
        <button id="handleClearRightValues" onClick={handleClearRightValues} />
      </React.Fragment>
    );
  };

  const DualListSelect = (props) => <DualListSelectCommon DualListSelect={Dummy} {...props} />;

  const rendererProps = {
    onSubmit: jest.fn(),
    FormTemplate: ({ formFields }) => formFields,
    componentMapper: { [componentTypes.DUAL_LIST_SELECT]: DualListSelect },
    schema: {
      fields: [
        {
          name: 'list',
          component: componentTypes.DUAL_LIST_SELECT,
          options: [
            {
              value: 'cats',
              label: 'cats',
            },
            {
              value: 'cats_1',
              label: 'cats_1',
            },
            {
              value: 'cats_2',
              label: 'cats_2',
            },
            {
              value: 'zebras',
              label: 'zebras',
            },
            {
              value: 'pigeons',
              label: 'pigeons',
            },
          ],
        },
      ],
    },
  };

  it('move one left', async () => {
    await act(async () => {
      wrapper = mount(<FormRenderer {...rendererProps} initialValues={{ list: ['cats_2'] }} />);
    });
    wrapper.update();

    expect(state).toEqual({
      filterOptions: '',
      filterValue: '',
      lastLeftClicked: undefined,
      lastRightClicked: undefined,
      leftValues: [
        { label: 'cats', value: 'cats' },
        { label: 'cats_1', value: 'cats_1' },
        { label: 'pigeons', value: 'pigeons' },
        { label: 'zebras', value: 'zebras' },
      ],
      rightValues: [{ label: 'cats_2', value: 'cats_2' }],
      selectedLeftValues: [],
      selectedRightValues: [],
      sortLeftDesc: true,
      sortRightDesc: true,
      value: ['cats_2'],
    });

    await act(async () => {
      wrapper.find('#handleValuesClick').props().onClick(event, 'cats_2');
    });
    wrapper.update();

    expect(state).toEqual({
      filterOptions: '',
      filterValue: '',
      lastLeftClicked: undefined,
      lastRightClicked: 'cats_2',
      leftValues: [
        { label: 'cats', value: 'cats' },
        { label: 'cats_1', value: 'cats_1' },
        { label: 'pigeons', value: 'pigeons' },
        { label: 'zebras', value: 'zebras' },
      ],
      rightValues: [{ label: 'cats_2', value: 'cats_2' }],
      selectedLeftValues: [],
      selectedRightValues: ['cats_2'],
      sortLeftDesc: true,
      sortRightDesc: true,
      value: ['cats_2'],
    });

    await act(async () => {
      wrapper.find('#handleMoveLeft').simulate('click');
    });
    wrapper.update();

    expect(state).toEqual({
      filterOptions: '',
      filterValue: '',
      lastLeftClicked: undefined,
      lastRightClicked: 'cats_2',
      leftValues: [
        { label: 'cats', value: 'cats' },
        { label: 'cats_1', value: 'cats_1' },
        { label: 'cats_2', value: 'cats_2' },
        { label: 'pigeons', value: 'pigeons' },
        { label: 'zebras', value: 'zebras' },
      ],
      rightValues: [],
      selectedLeftValues: [],
      selectedRightValues: [],
      sortLeftDesc: true,
      sortRightDesc: true,
      value: [],
    });
  });

  it('move one right', async () => {
    await act(async () => {
      wrapper = mount(<FormRenderer {...rendererProps} />);
    });
    wrapper.update();

    expect(state).toEqual({
      filterOptions: '',
      filterValue: '',
      lastLeftClicked: undefined,
      lastRightClicked: undefined,
      leftValues: [
        { label: 'cats', value: 'cats' },
        { label: 'cats_1', value: 'cats_1' },
        { label: 'cats_2', value: 'cats_2' },
        { label: 'pigeons', value: 'pigeons' },
        { label: 'zebras', value: 'zebras' },
      ],
      rightValues: [],
      selectedLeftValues: [],
      selectedRightValues: [],
      sortLeftDesc: true,
      sortRightDesc: true,
      value: '',
    });

    await act(async () => {
      wrapper.find('#handleOptionsClick').props().onClick(event, 'cats_2');
    });
    wrapper.update();

    expect(state).toEqual({
      filterOptions: '',
      filterValue: '',
      lastLeftClicked: 'cats_2',
      lastRightClicked: undefined,
      leftValues: [
        { label: 'cats', value: 'cats' },
        { label: 'cats_1', value: 'cats_1' },
        { label: 'cats_2', value: 'cats_2' },
        { label: 'pigeons', value: 'pigeons' },
        { label: 'zebras', value: 'zebras' },
      ],
      rightValues: [],
      selectedLeftValues: ['cats_2'],
      selectedRightValues: [],
      sortLeftDesc: true,
      sortRightDesc: true,
      value: '',
    });

    await act(async () => {
      wrapper.find('#handleMoveRight').simulate('click');
    });
    wrapper.update();

    expect(state).toEqual({
      filterOptions: '',
      filterValue: '',
      lastLeftClicked: 'cats_2',
      lastRightClicked: undefined,
      leftValues: [
        { label: 'cats', value: 'cats' },
        { label: 'cats_1', value: 'cats_1' },
        { label: 'pigeons', value: 'pigeons' },
        { label: 'zebras', value: 'zebras' },
      ],
      rightValues: [{ label: 'cats_2', value: 'cats_2' }],
      selectedLeftValues: [],
      selectedRightValues: [],
      sortLeftDesc: true,
      sortRightDesc: true,
      value: ['cats_2'],
    });
  });

  it('move two right with ctrl', async () => {
    await act(async () => {
      wrapper = mount(<FormRenderer {...rendererProps} />);
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('#handleOptionsClick').props().onClick(event, 'cats_2');
    });
    wrapper.update();

    await act(async () => {
      wrapper
        .find('#handleOptionsClick')
        .props()
        .onClick({ ...event, ctrlKey: true }, 'cats_1');
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('#handleMoveRight').simulate('click');
    });
    wrapper.update();

    expect(state).toEqual({
      filterOptions: '',
      filterValue: '',
      lastLeftClicked: 'cats_1',
      lastRightClicked: undefined,
      leftValues: [
        { label: 'cats', value: 'cats' },
        { label: 'pigeons', value: 'pigeons' },
        { label: 'zebras', value: 'zebras' },
      ],
      rightValues: [
        { label: 'cats_1', value: 'cats_1' },
        { label: 'cats_2', value: 'cats_2' },
      ],
      selectedLeftValues: [],
      selectedRightValues: [],
      sortLeftDesc: true,
      sortRightDesc: true,
      value: ['cats_2', 'cats_1'],
    });
  });

  it('unselect with ctrl', async () => {
    await act(async () => {
      wrapper = mount(<FormRenderer {...rendererProps} />);
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('#handleOptionsClick').props().onClick(event, 'cats_2');
    });
    wrapper.update();

    await act(async () => {
      wrapper
        .find('#handleOptionsClick')
        .props()
        .onClick({ ...event, ctrlKey: true }, 'cats_1');
    });
    wrapper.update();

    await act(async () => {
      wrapper
        .find('#handleOptionsClick')
        .props()
        .onClick({ ...event, ctrlKey: true }, 'cats_2');
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('#handleMoveRight').simulate('click');
    });
    wrapper.update();

    expect(state).toEqual({
      filterOptions: '',
      filterValue: '',
      lastLeftClicked: 'cats_2',
      lastRightClicked: undefined,
      leftValues: [
        { label: 'cats', value: 'cats' },
        { label: 'cats_2', value: 'cats_2' },
        { label: 'pigeons', value: 'pigeons' },
        { label: 'zebras', value: 'zebras' },
      ],
      rightValues: [{ label: 'cats_1', value: 'cats_1' }],
      selectedLeftValues: [],
      selectedRightValues: [],
      sortLeftDesc: true,
      sortRightDesc: true,
      value: ['cats_1'],
    });
  });

  it('move three right with shift', async () => {
    await act(async () => {
      wrapper = mount(<FormRenderer {...rendererProps} />);
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('#handleOptionsClick').props().onClick(event, 'cats');
    });
    wrapper.update();

    await act(async () => {
      wrapper
        .find('#handleOptionsClick')
        .props()
        .onClick({ ...event, shiftKey: true }, 'cats_2');
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('#handleMoveRight').simulate('click');
    });
    wrapper.update();

    expect(state).toEqual({
      filterOptions: '',
      filterValue: '',
      lastLeftClicked: 'cats_2',
      lastRightClicked: undefined,
      leftValues: [
        { label: 'pigeons', value: 'pigeons' },
        { label: 'zebras', value: 'zebras' },
      ],
      rightValues: [
        { label: 'cats', value: 'cats' },
        { label: 'cats_1', value: 'cats_1' },
        { label: 'cats_2', value: 'cats_2' },
      ],
      selectedLeftValues: [],
      selectedRightValues: [],
      sortLeftDesc: true,
      sortRightDesc: true,
      value: ['cats', 'cats_1', 'cats_2'],
    });
  });

  it('move all left', async () => {
    await act(async () => {
      wrapper = mount(<FormRenderer {...rendererProps} initialValues={{ list: ['cats', 'cats_1', 'cats_2', 'pigeons', 'zebras'] }} />);
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('#handleClearRightValues').simulate('click');
    });
    wrapper.update();

    expect(state).toEqual({
      filterOptions: '',
      filterValue: '',
      lastLeftClicked: undefined,
      lastRightClicked: undefined,
      leftValues: [
        { label: 'cats', value: 'cats' },
        { label: 'cats_1', value: 'cats_1' },
        { label: 'cats_2', value: 'cats_2' },
        { label: 'pigeons', value: 'pigeons' },
        { label: 'zebras', value: 'zebras' },
      ],
      rightValues: [],
      selectedLeftValues: [],
      selectedRightValues: [],
      sortLeftDesc: true,
      sortRightDesc: true,
      value: [],
    });
  });

  it('move all right', async () => {
    await act(async () => {
      wrapper = mount(<FormRenderer {...rendererProps} />);
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('#handleClearLeftValues').simulate('click');
    });
    wrapper.update();

    expect(state).toEqual({
      filterOptions: '',
      filterValue: '',
      lastLeftClicked: undefined,
      lastRightClicked: undefined,
      leftValues: [],
      rightValues: [
        { label: 'cats', value: 'cats' },
        { label: 'cats_1', value: 'cats_1' },
        { label: 'cats_2', value: 'cats_2' },
        { label: 'pigeons', value: 'pigeons' },
        { label: 'zebras', value: 'zebras' },
      ],
      selectedLeftValues: [],
      selectedRightValues: [],
      sortLeftDesc: true,
      sortRightDesc: true,
      value: ['cats', 'cats_1', 'cats_2', 'pigeons', 'zebras'],
    });
  });

  it('filter options', async () => {
    await act(async () => {
      wrapper = mount(<FormRenderer {...rendererProps} />);
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('#filterOptions').props().onClick('cats_');
    });
    wrapper.update();

    expect(state).toEqual({
      filterOptions: 'cats_',
      filterValue: '',
      lastLeftClicked: undefined,
      lastRightClicked: undefined,
      leftValues: [
        { label: 'cats_1', value: 'cats_1' },
        { label: 'cats_2', value: 'cats_2' },
      ],
      rightValues: [],
      selectedLeftValues: [],
      selectedRightValues: [],
      sortLeftDesc: true,
      sortRightDesc: true,
      value: '',
    });
  });

  it('filter values', async () => {
    await act(async () => {
      wrapper = mount(<FormRenderer {...rendererProps} initialValues={{ list: ['cats', 'cats_1', 'cats_2', 'pigeons', 'zebras'] }} />);
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('#filterValues').props().onClick('cats_');
    });
    wrapper.update();

    expect(state).toEqual({
      filterOptions: '',
      filterValue: 'cats_',
      lastLeftClicked: undefined,
      lastRightClicked: undefined,
      leftValues: [],
      rightValues: [
        { label: 'cats_1', value: 'cats_1' },
        { label: 'cats_2', value: 'cats_2' },
      ],
      selectedLeftValues: [],
      selectedRightValues: [],
      sortLeftDesc: true,
      sortRightDesc: true,
      value: ['cats', 'cats_1', 'cats_2', 'pigeons', 'zebras'],
    });
  });

  it('sort options', async () => {
    await act(async () => {
      wrapper = mount(<FormRenderer {...rendererProps} />);
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('#sortOptions').simulate('click');
    });
    wrapper.update();

    expect(state).toEqual({
      filterOptions: '',
      filterValue: '',
      lastLeftClicked: undefined,
      lastRightClicked: undefined,
      leftValues: [
        { label: 'zebras', value: 'zebras' },
        { label: 'pigeons', value: 'pigeons' },
        { label: 'cats_2', value: 'cats_2' },
        { label: 'cats_1', value: 'cats_1' },
        { label: 'cats', value: 'cats' },
      ],
      rightValues: [],
      selectedLeftValues: [],
      selectedRightValues: [],
      sortLeftDesc: false,
      sortRightDesc: true,
      value: '',
    });

    await act(async () => {
      wrapper.find('#sortOptions').simulate('click');
    });
    wrapper.update();

    expect(state).toEqual({
      filterOptions: '',
      filterValue: '',
      lastLeftClicked: undefined,
      lastRightClicked: undefined,
      leftValues: [
        { label: 'cats', value: 'cats' },
        { label: 'cats_1', value: 'cats_1' },
        { label: 'cats_2', value: 'cats_2' },
        { label: 'pigeons', value: 'pigeons' },
        { label: 'zebras', value: 'zebras' },
      ],
      rightValues: [],
      selectedLeftValues: [],
      selectedRightValues: [],
      sortLeftDesc: true,
      sortRightDesc: true,
      value: '',
    });
  });

  it('sort values', async () => {
    await act(async () => {
      wrapper = mount(<FormRenderer {...rendererProps} initialValues={{ list: ['cats', 'cats_1', 'cats_2', 'pigeons', 'zebras'] }} />);
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('#sortValues').simulate('click');
    });
    wrapper.update();

    expect(state).toEqual({
      filterOptions: '',
      filterValue: '',
      lastLeftClicked: undefined,
      lastRightClicked: undefined,
      leftValues: [],
      rightValues: [
        { label: 'zebras', value: 'zebras' },
        { label: 'pigeons', value: 'pigeons' },
        { label: 'cats_2', value: 'cats_2' },
        { label: 'cats_1', value: 'cats_1' },
        { label: 'cats', value: 'cats' },
      ],
      selectedLeftValues: [],
      selectedRightValues: [],
      sortLeftDesc: true,
      sortRightDesc: false,
      value: ['cats', 'cats_1', 'cats_2', 'pigeons', 'zebras'],
    });

    await act(async () => {
      wrapper.find('#sortValues').simulate('click');
    });
    wrapper.update();

    expect(state).toEqual({
      filterOptions: '',
      filterValue: '',
      lastLeftClicked: undefined,
      lastRightClicked: undefined,
      leftValues: [],
      rightValues: [
        { label: 'cats', value: 'cats' },
        { label: 'cats_1', value: 'cats_1' },
        { label: 'cats_2', value: 'cats_2' },
        { label: 'pigeons', value: 'pigeons' },
        { label: 'zebras', value: 'zebras' },
      ],
      selectedLeftValues: [],
      selectedRightValues: [],
      sortLeftDesc: true,
      sortRightDesc: true,
      value: ['cats', 'cats_1', 'cats_2', 'pigeons', 'zebras'],
    });
  });
});
