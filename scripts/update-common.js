/* eslint-disable no-console */
const replace = require('replace-in-file');
const glob = require('glob');

const nextVersion = process.argv[2];
console.log('Updating common package version!\n');
console.log('Next version is:', nextVersion, '\n');

const root = process.cwd();
const files = glob.sync(`${root}/packages/*/package.json`);

console.log('Files to replace: ', files.join(',\n'), '\n');
console.log('Replacing to: ', `"@data-driven-forms/common": "^${nextVersion}"`, '\n');

const optionTypeScriptPath = {
  files,
  from: '"@data-driven-forms/common": "*"',
  to: `"@data-driven-forms/common": "^${nextVersion}"`,
};

(async () => await replace(optionTypeScriptPath))();

console.log('Common package version successfully updated!\n');
