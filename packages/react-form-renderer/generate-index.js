const glob = require('glob');
const path = require('path');
const fse = require('fs-extra');

const src = path.resolve(__dirname, './src');

function camelize(str) {
  const arr = str.split('-');
  const capital = arr.map((item, index) => (index ? item.charAt(0).toUpperCase() + item.slice(1).toLowerCase() : item.toLowerCase()));
  return capital.join('');
}

function generateIndex() {
  const directories = glob
    .sync(`${src}/*/`)
    .filter((name) => !name.includes('/tests/') && !name.includes('/common/'))
    .map((path) =>
      path
        .replace(/\/$/, '')
        .split('/')
        .pop()
    );
  const content = `${directories.map(
    (dir) => `export { default as ${camelize(dir)} } from './${dir}';
`
  )}`.replace(/,/g, '');

  return fse.writeFileSync(`${src}/index.js`, content);
}

function run() {
  try {
    generateIndex();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
