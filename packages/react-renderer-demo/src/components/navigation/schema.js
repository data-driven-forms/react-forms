import { baseExamples } from './examples-definitions';
import otherExamples from './other-pages/';
import { docs } from './documentation-pages';

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

const generateLinks = (data, prevLink, prefix = '', escapeLink) =>  data.map((item, index) => {
  let result = { ...item };
  if (result.fields) {
    result.fields = generateLinks(
      result.fields,
      {
        link: `/${result.link || result.component}`,
        label: result.linkText || result.title,
      },
      `/${result.link || result.component}`,
      data[index + 1] ? {
        link: `${prefix}/${data[index + 1].link || data[index + 1].component}`,
        label: data[index + 1].linkText || data[index + 1].title,
      } : undefined
    );
  }

  if (index > 0 && !result.prev) {
    result.prev = {
      link: `${prefix}/${data[index - 1].link || data[index - 1].component}`,
      label: data[index - 1].linkText || data[index - 1].title,
    };
  }

  if (!result.prev) {
    result.prev = prevLink;
  }

  if (data[index + 1] && !result.next) {
    result.next = {
      link: `${prefix}/${data[index + 1].link || data[index + 1].component}`,
      label: data[index + 1].linkText || data[index + 1].title,
    };
  }

  if (index === data.length - 1 && escapeLink && !result.next) {
    result.next = escapeLink;
  }

  return result;
});

const links = generateLinks(schema);

export default links;
