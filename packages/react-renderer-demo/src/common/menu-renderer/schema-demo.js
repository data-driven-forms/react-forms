import { baseExamples } from '../examples-definitions';
import { otherExamples } from '../other-pages';
import { docs } from '../documenation-pages';

const schema =  [
  {
    linkText: 'Demo',
    link: 'show-case',
  },
  {
    linkText: 'Live Form Editor',
    link: 'live-editor',
  },
  {
    title: 'React form renderer',
    link: 'renderer',
    fields: [
      ...docs,
    ],
  },
  {
    title: 'Component definitions',
    link: 'component-example',
    fields: [
      ...baseExamples.sort((a, b) => a.linkText.localeCompare(b.linkText)),
    ],
  },
  {
    title: 'Others',
    link: 'others',
    fields: [
      ...otherExamples,
    ],
  },
];

export default schema;
