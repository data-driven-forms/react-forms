import { baseExamples } from '../examples-definitions';

const mappersSchema = [
  {
    subHeader: true,
    noRoute: true,
    title: 'Component mapper'
  },
  {
    linkText: 'Custom mapper',
    link: 'custom-mapper'
  },
  {
    linkText: 'Global component props',
    link: 'global-component-props'
  },
  {
    linkText: 'File input',
    link: 'file-input'
  },
  {
    linkText: 'Common components API',
    link: 'component-api'
  },
  {
    subHeader: true,
    noRoute: true,
    title: 'Provided mappers'
  },
  {
    link: 'ant-component-mapper',
    linkText: 'Ant Design Mapper'
  },
  {
    link: 'blueprint-component-mapper',
    linkText: 'Blueprint mapper'
  },
  {
    link: 'carbon-component-mapper',
    linkText: 'Carbon mapper'
  },
  {
    link: 'mui-component-mapper',
    linkText: 'Material UI mapper'
  },
  {
    link: 'pf3-component-mapper',
    linkText: 'PF3 mapper'
  },
  {
    link: 'pf4-component-mapper',
    linkText: 'PF4 mapper'
  },
  {
    link: 'suir-component-mapper',
    linkText: 'Semantic UI mapper'
  },
  {
    subHeader: true,
    noRoute: true,
    title: 'Mapper components'
  },
  ...baseExamples.sort((a, b) => a.linkText.localeCompare(b.linkText)),
  {
    subHeader: true,
    noRoute: true,
    title: 'Schema mappers'
  },
  {
    link: 'action-mapper',
    linkText: 'Action mapper'
  },
  {
    link: 'schema-validator-mapper ',
    linkText: 'Schema validator mapper'
  },
  {
    link: 'validator-mapper',
    linkText: 'Validator mapper',
    divider: true
  }
];

export default mappersSchema;
