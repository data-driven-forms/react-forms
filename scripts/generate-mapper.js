/* eslint-disable no-console */
const inquirer = require('inquirer');
const replace = require('replace-in-file');
const ncp = require('ncp').ncp;
const path = require('path');

const QUESTIONS = [
  {
    name: 'componentmapper',
    type: 'input',
    message: 'Project name (i.e.: pf4, pf3, mui, blueprint, etc.):',
    validate(input) {
      if (/^([A-Za-z\d_-])+$/.test(input)) {
        return true;
      } else {
        return 'Project name may only include letters or numbers.';
      }
    }
  },
  {
    name: 'typescript',
    type: 'confirm',
    message: 'Do you want to attach TypeScript types?'
  }
];

inquirer.prompt(QUESTIONS).then(async ({ componentmapper, typescript }) => {
  const successmessage = `Next steps:

  1. Update styles in "packages/${componentmapper}-component-mapper/demo/index.html"
  2. Add dependencies in "packages/${componentmapper}-component-mapper/package.json",
  3. (optional) Transform imports to allow threeshake (bundle size optimization) in "packages/common/babel.config.js"
  4. Have a fun and make some magic! :-)

  Please visit https://data-driven-forms.org for more information.

  (After your mapper is done, consider adding it to the documentation page.)
  `;

  console.log('Creating ', componentmapper, '-component-mapper', typescript ? ' with TypeScript' : '');

  console.log('Copying template');
  await ncp('./templates/component-mapper', `./packages/${componentmapper}-component-mapper`, {}, async () => {
    console.log('Replacing strings');

    const options = {
      files: [
        path.resolve(__dirname, `../packages/${componentmapper}-component-mapper/README.md`),
        path.resolve(__dirname, `../packages/${componentmapper}-component-mapper/package.json`),
        path.resolve(__dirname, `../packages/${componentmapper}-component-mapper/demo/index.js`)
      ],
      from: /\{\{componentmapper\}\}/g,
      to: componentmapper
    };

    try {
      await replace(options);
    } catch (e) {
      console.error('Error occurred:', e);
    }

    const optionTypeScriptPath = {
      files: [path.resolve(__dirname, `../packages/${componentmapper}-component-mapper/package.json`)],
      from: /\{\{typingspath\}\}/g,
      to: typescript ? '\n  "typings": "index.d.ts",' : ''
    };
    const optionTypeScriptCommand = {
      files: [path.resolve(__dirname, `../packages/${componentmapper}-component-mapper/package.json`)],
      from: /\{\{buildtypingscmd\}\}/g,
      to: typescript ? ' && npm run build:typings' : ''
    };
    const optionTypeScriptScript = {
      files: [path.resolve(__dirname, `../packages/${componentmapper}-component-mapper/package.json`)],
      from: /\{\{buildtypingsscript\}\}/g,
      to: typescript ? '\n    "build:typings": "node ../../scripts/generate-typings.js",' : ''
    };

    try {
      await replace(optionTypeScriptPath);
      await replace(optionTypeScriptCommand);
      await replace(optionTypeScriptScript);
    } catch (e) {
      console.error('Error occurred when replacing typescript variables:', e);
    }

    if (typescript) {
      await ncp('./templates/typings', `./packages/${componentmapper}-component-mapper`, {}, () => {
        console.log(successmessage);
      });
    } else {
      console.log(successmessage);
    }
  });
});
