const path = require('path');
const fse = require('fs-extra');
const glob = require('glob');

const packagePath = process.cwd();
const buildPath = path.join(packagePath, './');
const srcPath = path.join(packagePath, './src');
const typesPath = path.join(packagePath, './src/types');

const kebabToCamel = (str) =>
  str
    .split('-')
    .map((w) => w.replace(/^./, (char) => char.toUpperCase()))
    .join('')
    .split('.')
    .shift();

async function generateIndexTypes(from, to) {
  const files = glob
    .sync(`${from}/*/`)
    .filter((name) => !name.includes('/tests/'))
    .map((path) => path.replace(/\/$/, '').split('/').pop());
  const content = `${files.map((file) => {
    let module;
    let exportName;
    const moduleSource = `${from}/${file.split('.').shift()}/${file}.js`.replace('//', '/');
    try {
      module = require(`${to}/${file.split('.').shift()}`);
    } catch (error) {
      console.log('Unable to find module: ', moduleSource);
      module = {};
      exportName = kebabToCamel(file.split('/').shift());
    }

    let fileSource;
    /**
     * Transform default module name to build index.d.ts export name
     */
    if (module.default) {
      try {
        fileSource = fse.readFileSync(moduleSource, { encoding: 'utf-8' });
      } catch (error) {
        console.error(`Unable to read file ${moduleSource}`);
        exportName = kebabToCamel(file.split('/').shift());
      }

      let name = fileSource.match(/export default *[a-zA-Z\d;]+\n/gm);
      if (name !== null) {
        name = name.pop().replace('export default', '').replace(/\n/, '').replace(';', '').trim();
      } else {
        name = kebabToCamel(file.split('/').shift());
      }

      exportName = name;
      if (!name) {
        throw new Error(`module name missing!: ${file}\n`);
      }
    }

    if (!exportName) {
      exportName = kebabToCamel(file.split('/').shift());
    }

    return `export { default as ${exportName} } from './${file.split('.').shift()}';
export * from './${file.split('.').shift()}';
`;
  })}`.replace(/,/g, '');
  return Promise.all([fse.writeFile(path.resolve(to, 'index.d.ts'), content)]);
}

async function copyTypesDefinitions(from, to) {
  if (!(await fse.exists(to))) {
    console.warn(`path ${to} does not exists`);
    return [];
  }

  const files = glob.sync('**/*.d.ts', { cwd: from });
  const cmds = files.map((file) => {
    return fse.copy(path.resolve(from, file), path.resolve(to, file));
  });
  return Promise.all(cmds);
}

async function copy() {
  try {
    // .d.ts files
    const useTypesFolder = process.argv.slice(2)[0];

    // should use /types/ folder or /files/
    const pathToTypes = useTypesFolder ? typesPath : srcPath;

    await copyTypesDefinitions(pathToTypes, buildPath);
    await generateIndexTypes(pathToTypes, buildPath);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

copy();
