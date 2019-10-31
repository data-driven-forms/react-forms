import { baseExamples } from './examples-definitions';
import otherExamples from './other-pages/';
import { docs } from './documentation-pages';
import flatMap from 'lodash/flatMap';

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
    noRoute: true,
    fields: [
      ...docs,
    ],
  },
  {
    title: 'Component definitions',
    link: 'component-example',
    noRoute: true,
    fields: [
      ...baseExamples.sort((a, b) => a.linkText.localeCompare(b.linkText)),
    ],
  },
  {
    title: 'Others',
    link: 'others',
    noRoute: true,
    fields: [
      ...otherExamples,
    ],
  },
];

const getNextLink = (item, itemIndex, source) => {
  const nextIndex = itemIndex + 1;
  const nextItem = (nextIndex < source.length && source[nextIndex].noRoute) ?
    (nextIndex + 1 < source.length) ? source[nextIndex + 1] : {} : source[nextIndex] || {};

  return {
    link: nextItem.link,
    label: nextItem.linkText || nextItem.title,
  };
};

const getPrevLink = (item, itemIndex, source) => {
  const prevIndex = itemIndex - 1;
  const prevItem = (prevIndex >= 0 && source[prevIndex].noRoute) ?
    (prevIndex - 1 >= 0) ? source[prevIndex - 1] : {} : source[prevIndex] || {};

  return {
    link: prevItem.link,
    label: prevItem.linkText || prevItem.title,
  };
};

export const flatSchema = flatMap(schema, item => item.fields ? [ item, ...item.fields.map(child => {
  child.link = child.link || child.component;
  return ({
    ...child,
    link: `${item.link}${child.link.match(/^\?/) ? '' : '/'}${child.link}` });
}),
] : [ item ]).reduce((acc, curr, currentIndex, source) => ([
  ...acc,
  {
    ...curr,
    prev: getPrevLink(curr, currentIndex, source),
    next: getNextLink(curr, currentIndex, source),
  },
]), []);

export default schema;
