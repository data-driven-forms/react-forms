import React from 'react';
import { mount } from 'enzyme';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Subform from '../form-fields/sub-form';

describe('subform', () => {
  const props = {
    fields: [
      {
        key: 'cosiKey',
        title: 'cosiTitle',
        name: 'cosiName',
        fields: [],
      },
      {
        key: 'cosiKey2',
        title: 'cosiTitle2',
        name: 'cosiName2',
        fields: [],
      },
    ],
    formOptions: {
      renderForm: jest.fn().mockImplementation(() => <h1>Content</h1>),
    },
  };

  const TITLE = 'TIIIITLE';
  const DESCRIPTION = 'THIS IS DESCRIPTION';

  it('should render correctly', () => {
    const wrapper = mount(<Subform { ...props } />);

    expect(wrapper.find(Grid)).toHaveLength(2);
    expect(wrapper.find(Typography)).toHaveLength(0);
    expect(wrapper.find('h1')).toHaveLength(1);
  });

  it('should render correctly with title', () => {
    const wrapper = mount(<Subform { ...props } title={ TITLE }/>);

    expect(wrapper.find(Grid)).toHaveLength(3);
    expect(wrapper.find(Typography)).toHaveLength(1);
    expect(wrapper.find(Typography).text().includes(TITLE)).toEqual(true);
    expect(wrapper.find('h1')).toHaveLength(1);
  });

  it('should render correctly with description', () => {
    const wrapper = mount(<Subform { ...props } description={ DESCRIPTION }/>);

    expect(wrapper.find(Grid)).toHaveLength(3);
    expect(wrapper.find(Typography)).toHaveLength(1);
    expect(wrapper.find(Typography).text().includes(DESCRIPTION)).toEqual(true);
    expect(wrapper.find('h1')).toHaveLength(1);
  });

  it('should render correctly with title and description', () => {
    const wrapper = mount(<Subform { ...props } title={ TITLE } description={ DESCRIPTION }/>);

    expect(wrapper.find(Grid)).toHaveLength(4);
    expect(wrapper.find(Typography)).toHaveLength(2);
    expect(wrapper.find(Typography).first().text().includes(TITLE)).toEqual(true);
    expect(wrapper.find(Typography).last().text().includes(DESCRIPTION)).toEqual(true);
    expect(wrapper.find('h1')).toHaveLength(1);
  });
});
