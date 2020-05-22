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
  }
];

inquirer.prompt(QUESTIONS).then(async ({ componentmapper }) => {
  console.log('Creating ', componentmapper, '-component-mapper');

  console.log('Copying template');
  await ncp('./templates/component-mapper', `./packages/${componentmapper}-component-mapper`, {}, async () => {
    console.log('Replacing strings');

    const options = {
      files: [
        path.resolve(__dirname, `../packages/${componentmapper}-component-mapper/README.md`),
        path.resolve(__dirname, `../packages/${componentmapper}-component-mapper/package.json`),
        path.resolve(__dirname, `../packages/${componentmapper}-component-mapper/rollup.config.js`),
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

    console.log(`
  Next steps:

    1. Update styles in "packages/${componentmapper}-component-mapper/demo/index.html"
    2. Add dependencies in "packages/${componentmapper}-component-mapper/package.json",
    3. Mark the dependencies as globals/external in "packages/${componentmapper}-component-mapper/rollup.config.js"
    4. (optional) Transform import to allow threeshake (bundle size optimization) in "packages/common/babel.config.js"
    5. Have a fun and make some magic! :-)

  Please visit https://data-driven-forms.org for more information.

  (After your mapper is done, consider adding it to the documentation page.)
    `);
  });
});
