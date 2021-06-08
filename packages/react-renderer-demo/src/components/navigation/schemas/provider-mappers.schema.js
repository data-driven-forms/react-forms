import { baseExamples } from '../examples-definitions';

const providedMappersSchema = [
  {
    linkText: 'Common components API',
    link: 'component-api'
  },
  {
    subHeader: true,
    noRoute: true,
    title: 'Mappers'
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
  ...baseExamples.sort((a, b) => a.linkText.localeCompare(b.linkText))
];

export default providedMappersSchema;
