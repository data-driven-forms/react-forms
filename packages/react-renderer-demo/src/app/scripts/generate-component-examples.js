const glob = require('glob');
const path = require('path');
const fs = require('fs');

const camelCased = (string) => string.replace(/-([a-z])/g, (g) => g[1].toUpperCase()).replace(/^./, (g) => g.toUpperCase());

const availableMappers = [
  { title: 'MUI', mapper: 'mui' },
  { title: 'PF4', mapper: 'pf4' },
  { title: 'PF3', mapper: 'pf3' },
  { title: 'BJS', mapper: 'blueprint' },
  { title: 'SUIR', mapper: 'suir' }
];

const targetDirectory = path.resolve(__dirname, '../src/doc-components');

const mdSources = availableMappers.reduce(
  (acc, curr) => ({
    ...acc,
    [curr.mapper]: glob.sync(path.resolve(__dirname, `../src/doc-components/examples-texts/${curr.mapper}/*.md`)).map((path) => path.split('/').pop())
  }),
  {}
);

const filesToGenerate = glob.sync(path.resolve(__dirname, '../pages/component-example/*.js')).map((path) =>
  path
    .split('/')
    .pop()
    .replace('.js', '')
);

const fileTemplate = `import React from 'react';
import PropTypes from 'prop-types';
{{imports}}
import GenericMuiComponent from '../helpers/generic-mui-component';

const {{componentName}} = ({ activeMapper }) => {
{{renders}}
  return <GenericMuiComponent activeMapper={activeMapper} component="{{file}}" />;
};

{{componentName}}.propTypes = {
  activeMapper: PropTypes.string.isRequired
};

export default {{componentName}};
`;

filesToGenerate.forEach((file) => {
  const componentName = camelCased(file);
  let markup = fileTemplate.replace(/\{\{componentName\}\}/g, componentName);
  const imports = `${availableMappers
    .filter(({ mapper }) => mdSources[mapper].find((name) => name === `${mapper}-${file}.md`))
    .map(
      ({ mapper }) =>
        `import ${mapper.replace(/^./, (g) => g.toUpperCase())}${camelCased(file).replace(/^./, (g) =>
          g.toUpperCase()
        )} from './examples-texts/${mapper}/${mapper}-${file}.md';`
    )
    .join('\n')}`;
  markup = markup.replace('{{imports}}', imports);
  const renders = `${availableMappers
    .filter(({ mapper }) => mdSources[mapper].find((name) => name === `${mapper}-${file}.md`))
    .map(
      ({ mapper }) =>
        `  if (activeMapper === '${mapper}') {
    return <${mapper.replace(/^./, (g) => g.toUpperCase())}${camelCased(file).replace(/^./, (g) => g.toUpperCase())} />;
  }\n`
    )
    .join('\n')}`;
  markup = markup.replace('{{file}}', file);
  markup = markup.replace('{{renders}}', renders);
  const targetFile = path.resolve(targetDirectory, file);
  fs.writeFileSync(`${targetFile}.js`, markup);
});
