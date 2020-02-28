import React from 'react';
import toJson from 'enzyme-to-json';
import { mount } from 'enzyme';
import FormRenderer from '@data-driven-forms/react-form-renderer';
import { componentTypes as components } from '@data-driven-forms/react-form-renderer';
import { formFieldsMapper, layoutMapper } from '../';

const schema = {
  fields: [
    {
      name: 'text_box_21',
      label: 'Text Box With Input Addon',
      title: 'Text Box With Input Addon',
      component: components.TEXT_FIELD
    }
  ]
};

describe('<Input Addon>', () => {
  it('should render single before input addon correctly', () => {
    const inputAddon = {
      before: {
        fields: [
          {
            component: components.PLAIN_TEXT,
            label: '-',
            name: 'name1',
            variant: 'span'
          }
        ]
      }
    };
    const wrapper = mount(
      <FormRenderer
        schema={{ ...schema, fields: [{ ...schema.fields[0], inputAddon }] }}
        formFieldsMapper={formFieldsMapper}
        layoutMapper={layoutMapper}
        onCancel={() => {}}
        showFormControls={false}
        onSubmit={jest.fn()}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render single button before input addon correctly', () => {
    const inputAddon = {
      before: {
        fields: [
          {
            component: components.INPUT_ADDON_BUTTON_GROUP,
            name: 'i-a-g-2',
            fields: [
              {
                component: components.BUTTON,
                label: 'Set 2',
                name: 'set2'
              }
            ]
          }
        ]
      }
    };
    const wrapper = mount(
      <FormRenderer
        schema={{ ...schema, fields: [{ ...schema.fields[0], inputAddon }] }}
        formFieldsMapper={formFieldsMapper}
        layoutMapper={layoutMapper}
        onCancel={() => {}}
        showFormControls={false}
        onSubmit={jest.fn()}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render single after input addon correctly', () => {
    const inputAddon = {
      after: {
        fields: [
          {
            component: components.PLAIN_TEXT,
            label: '-',
            name: 'name1',
            variant: 'span'
          }
        ]
      }
    };
    const wrapper = mount(
      <FormRenderer
        schema={{ ...schema, fields: [{ ...schema.fields[0], inputAddon }] }}
        formFieldsMapper={formFieldsMapper}
        layoutMapper={layoutMapper}
        onCancel={() => {}}
        showFormControls={false}
        onSubmit={jest.fn()}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render single button after input addon correctly', () => {
    const inputAddon = {
      after: {
        fields: [
          {
            component: components.BUTTON,
            label: 'Set 3',
            name: 'set3'
          }
        ]
      }
    };
    const wrapper = mount(
      <FormRenderer
        schema={{ ...schema, fields: [{ ...schema.fields[0], inputAddon }] }}
        formFieldsMapper={formFieldsMapper}
        layoutMapper={layoutMapper}
        onCancel={() => {}}
        showFormControls={false}
        onSubmit={jest.fn()}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render group button before input addon correctly', () => {
    const inputAddon = {
      before: {
        fields: [
          {
            component: components.INPUT_ADDON_BUTTON_GROUP,
            name: 'i-a-g-2',
            fields: [
              {
                component: components.BUTTON,
                label: 'Set 1',
                name: 'set1',
                onClick: () => {}
              },
              {
                component: components.BUTTON,
                label: 'Set 2',
                name: 'set2'
              }
            ]
          }
        ]
      }
    };
    const wrapper = mount(
      <FormRenderer
        schema={{ ...schema, fields: [{ ...schema.fields[0], inputAddon }] }}
        formFieldsMapper={formFieldsMapper}
        layoutMapper={layoutMapper}
        onCancel={() => {}}
        showFormControls={false}
        onSubmit={jest.fn()}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render group mixed before input addon correctly', () => {
    const inputAddon = {
      before: {
        fields: [
          {
            component: components.INPUT_ADDON_GROUP,
            name: 'i-a-g-2',
            fields: [
              {
                component: components.PLAIN_TEXT,
                label: '-',
                name: 'name1',
                variant: 'span'
              }
            ]
          },
          {
            component: components.INPUT_ADDON_BUTTON_GROUP,
            name: 'i-a-g-3',
            fields: [
              {
                component: components.BUTTON,
                label: 'Set 3',
                name: 'set3'
              }
            ]
          }
        ]
      }
    };
    const wrapper = mount(
      <FormRenderer
        schema={{ ...schema, fields: [{ ...schema.fields[0], inputAddon }] }}
        formFieldsMapper={formFieldsMapper}
        layoutMapper={layoutMapper}
        onCancel={() => {}}
        showFormControls={false}
        onSubmit={jest.fn()}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render the ultimate input addon correctly', () => {
    const inputAddon = {
      before: {
        fields: [
          {
            component: components.INPUT_ADDON_BUTTON_GROUP,
            name: 'i-a-g-2',
            fields: [
              {
                component: components.BUTTON,
                label: 'Set 1',
                name: 'set1',
                onClick: () => {}
              },
              {
                component: components.BUTTON,
                label: 'Set 2',
                name: 'set2'
              }
            ]
          }
        ]
      },
      after: {
        fields: [
          {
            component: components.INPUT_ADDON_GROUP,
            name: 'i-a-g-2',
            fields: [
              {
                component: components.PLAIN_TEXT,
                label: '-',
                name: 'name1',
                variant: 'span'
              }
            ]
          },
          {
            component: components.INPUT_ADDON_BUTTON_GROUP,
            name: 'i-a-g-3',
            fields: [
              {
                component: components.BUTTON,
                label: 'Set 3',
                name: 'set3'
              }
            ]
          }
        ]
      }
    };
    const wrapper = mount(
      <FormRenderer
        schema={{ ...schema, fields: [{ ...schema.fields[0], inputAddon }] }}
        formFieldsMapper={formFieldsMapper}
        layoutMapper={layoutMapper}
        onCancel={() => {}}
        showFormControls={false}
        onSubmit={jest.fn()}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
