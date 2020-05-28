const path = require('path');
const fse = require('fs-extra');
const glob = require('glob');

const packagePath = process.cwd();
const buildPath = path.join(packagePath, './dist');
const srcPath = path.join(packagePath, './src/files');

const kebabToCamel = (str) =>
  str
    .split('-')
    .map((w) => w.replace(/^./, (char) => char.toUpperCase()))
    .join('')
    .split('.')
    .shift();

async function generateIndexTypes(from, to) {
  const files = glob.sync('**/*.d.ts', { cwd: from });
  const content = `${files.map(
    (file) => `export { default as ${kebabToCamel(file)} } from './${file.split('.').shift()}';
export * from './${file.split('.').shift()}';
`
  )}`.replace(/,/g, '');
  return Promise.all([fse.writeFile(path.resolve(to, 'cjs/index.d.ts'), content)]);
}

async function copyTypesDefinitions(from, to) {
  if (!(await fse.exists(to))) {
    console.warn(`path ${to} does not exists`);
    return [];
  }

  const files = glob.sync('**/*.d.ts', { cwd: from });
  const cmds = files.map((file) => {
    return fse.copy(path.resolve(from, file), path.resolve(to, `cjs/${file.split('/').pop()}`));
  });
  return Promise.all(cmds);
}

async function copy() {
  try {
    // .d.ts files
    await copyTypesDefinitions(srcPath, buildPath);
    await generateIndexTypes(srcPath, buildPath);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

copy();
