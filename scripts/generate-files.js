const glob = require('glob');
const path = require('path');
const fse = require('fs-extra');

const names = glob.sync('./src/files/*.js');

names.forEach((name) => {
  const folder = name
    .split('/')
    .pop()
    .replace('.js', '');
  const dest = path.resolve(__dirname, `./src/${folder}`);
  if (!fse.existsSync(dest)) {
    fse.mkdirSync(dest);
  }

  fse.copyFileSync(name, `./src/${folder}/${folder}.js`);
  fse.copyFileSync(name.replace('.js', '.d.ts'), `./src/${folder}/${folder}.d.ts`);
  const jsIndex = `export { default } from './${folder}';
export * from './${folder}';
`;
  fse.writeFileSync(`./src/${folder}/index.js`, jsIndex);
  fse.writeFileSync(`./src/${folder}/index.d.ts`, jsIndex);
});
