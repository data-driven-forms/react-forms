/* eslint-disable react/prop-types */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FormRenderer, componentTypes } from '@data-driven-forms/react-form-renderer';

import DualListSelectCommon from '../../dual-list-select';

describe('dual list select', () => {
  let state;

  const spyState = (newState) => {
    state = newState;
  };

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
        {leftValues.map(({ label, value }) => (
          <button key={value} onClick={(event) => handleOptionsClick(event, value)}>
            {label}
          </button>
        ))}
        {rightValues.map(({ label, value }) => (
          <button key={value} onClick={(event) => handleValuesClick(event, value)}>
            {label}
          </button>
        ))}
        <button aria-label="handleMoveRight" onClick={handleMoveRight} />
        <button aria-label="handleMoveLeft" onClick={handleMoveLeft} />
        <button aria-label="sortOptions" onClick={sortOptions} />
        <button aria-label="sortValues" onClick={sortValues} />
        <input type="text" aria-label="filterOptions" onChange={(e) => filterOptions(e.target.value)} value={state.filterOptions} />
        <input type="text" aria-label="filterValues" onChange={(e) => filterValues(e.target.value)} value={state.filterValues} />
        <button aria-label="handleClearLeftValues" onClick={handleClearLeftValues} />
        <button aria-label="handleClearRightValues" onClick={handleClearRightValues} />
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
    render(<FormRenderer {...rendererProps} initialValues={{ list: ['cats_2'] }} />);
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

    await userEvent.click(screen.getByText('cats_2'));

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

    await userEvent.click(screen.getByLabelText('handleMoveLeft'));

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
      value: '',
    });
  });

  it('move one right', async () => {
    render(<FormRenderer {...rendererProps} />);

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

    await userEvent.click(screen.getByText('cats_2'));

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

    await userEvent.click(screen.getByLabelText('handleMoveRight'));

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
    render(<FormRenderer {...rendererProps} />);

    await userEvent.click(screen.getByText('cats_2'));

    const user = userEvent.setup();

    await user.keyboard('{Control>}');
    await user.click(screen.getByText('cats_1'));
    await user.keyboard('{/Control}');

    await userEvent.click(screen.getByLabelText('handleMoveRight'));

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
    render(<FormRenderer {...rendererProps} />);
    await userEvent.click(screen.getByText('cats_2'));

    const user = userEvent.setup();

    await user.keyboard('{Control>}');
    await user.click(screen.getByText('cats_1'));
    await user.click(screen.getByText('cats_2'));
    await user.keyboard('{/Control}');

    await userEvent.click(screen.getByLabelText('handleMoveRight'));

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
    render(<FormRenderer {...rendererProps} />);

    await userEvent.click(screen.getByText('cats'));

    const user = userEvent.setup();

    await user.keyboard('{Shift>}');
    await user.click(screen.getByText('cats_2'));
    await user.keyboard('{/Shift}');

    await userEvent.click(screen.getByLabelText('handleMoveRight'));

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
    render(<FormRenderer {...rendererProps} initialValues={{ list: ['cats', 'cats_1', 'cats_2', 'pigeons', 'zebras'] }} />);

    await userEvent.click(screen.getByLabelText('handleClearRightValues'));

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

  it('move all right', async () => {
    render(<FormRenderer {...rendererProps} />);

    await userEvent.click(screen.getByLabelText('handleClearLeftValues'));

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
    render(<FormRenderer {...rendererProps} />);

    await userEvent.type(screen.getByLabelText('filterOptions'), 'cats_');

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
    render(<FormRenderer {...rendererProps} initialValues={{ list: ['cats', 'cats_1', 'cats_2', 'pigeons', 'zebras'] }} />);

    await userEvent.type(screen.getByLabelText('filterValues'), 'cats_');

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
    render(<FormRenderer {...rendererProps} />);

    await userEvent.click(screen.getByLabelText('sortOptions'));

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

    await userEvent.click(screen.getByLabelText('sortOptions'));

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
    render(<FormRenderer {...rendererProps} initialValues={{ list: ['cats', 'cats_1', 'cats_2', 'pigeons', 'zebras'] }} />);

    await userEvent.click(screen.getByLabelText('sortValues'));

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

    await userEvent.click(screen.getByLabelText('sortValues'));

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
