import flatMap from 'lodash/flatMap';
import schemaRenderer from './renderer.schema';
import schemaNav from './schema.schema';
import schemaHooks from './hooks.schema';
import mappersSchema from './mappers.schema';
import customExamplesSchema from './custom-examples.schema';

const schema = [
  {
    link: 'introduction',
    linkText: 'Introduction'
  },
  {
    linkText: 'Installation',
    link: 'installation'
  },
  {
    title: 'Schema',
    noRoute: true,
    link: 'schema',
    fields: schemaNav
  },
  {
    title: 'Components',
    link: 'components',
    noRoute: true,
    fields: schemaRenderer
  },
  {
    title: 'Hooks',
    link: 'hooks',
    noRoute: true,
    fields: schemaHooks
  },
  {
    title: 'Mappers',
    link: 'mappers',
    noRoute: true,
    fields: mappersSchema
  },
  {
    linkText: 'Form builder',
    link: 'live-editor'
  },
  {
    linkText: 'Testing',
    link: 'testing'
  },
  {
    linkText: 'Typescript',
    link: 'typescript'
  },
  {
    linkText: 'Development setup',
    link: 'development-setup'
  },
  {
    linkText: 'Optimization',
    link: 'optimization'
  },
  {
    title: 'Examples',
    link: 'examples',
    noRoute: true,
    fields: customExamplesSchema
  },
  {
    linkText: 'Releases',
    link: 'releases'
  },
  {
    linkText: 'FAQ',
    link: 'faq'
  },
  {
    link: 'migration-guide',
    linkText: 'Migration guide to version 2'
  }
];

const getNextLink = (item, itemIndex, source) => {
  const nextIndex = itemIndex + 1;
  const nextItem =
    nextIndex < source.length && source[nextIndex].noRoute ? (nextIndex + 1 < source.length ? source[nextIndex + 1] : {}) : source[nextIndex] || {};

  return {
    link: nextItem.link,
    label: nextItem.linkText || nextItem.title
  };
};

const getPrevLink = (item, itemIndex, source) => {
  const prevIndex = itemIndex - 1;
  const prevItem = prevIndex >= 0 && source[prevIndex].noRoute ? (prevIndex - 1 >= 0 ? source[prevIndex - 1] : {}) : source[prevIndex] || {};

  return {
    link: prevItem.link,
    label: prevItem.linkText || prevItem.title
  };
};

export const flatSchema = flatMap(schema, (item) =>
  item.fields
    ? [
        item,
        ...item.fields.map((child) => {
          if (child.noRoute) {
            return undefined;
          }

          child.link = child.link || child.component;
          return {
            ...child,
            link: `${item.link}${child.link.match(/^\?/) ? '' : '/'}${child.link}`
          };
        })
      ]
    : [item]
)
  .filter((link) => typeof link !== 'undefined')
  .reduce(
    (acc, curr, currentIndex, source) => [
      ...acc,
      {
        ...curr,
        prev: getPrevLink(curr, currentIndex, source),
        next: getNextLink(curr, currentIndex, source)
      }
    ],
    []
  );

export default schema;
