if (process.env.CI) {
  return;
}

const path = require('path');
const fse = require('fs-extra');
const glob = require('glob');

const root = path.resolve(__dirname, '../');
const x = glob.sync(path.resolve(root, './packages/*'));

function cleanPackage(p) {
  const ignore = fse.readFileSync(path.resolve(p, './.gitignore'), 'utf8');
  const ignores = ignore
    .split('\n')
    .filter((line) => !(line.length === 0 || line[0] === '#'))
    .filter((item) => !item.includes('node_modules'));
  const positive = [];
  const negative = [];
  ignores.forEach((item) => {
    if (item[0] === '!') {
      negative.push(item.replace(/^!/, ''));
    } else {
      positive.push(item);
    }
  });
  const pattern = `{${positive.join(',')}}`;
  const files = glob.sync(path.resolve(p, `./${pattern}`)).filter((item) => !negative.find((n) => item.includes(n) || item.includes('node_modules')));
  files.forEach((file) => {
    fse.removeSync(file);
  });
}

function run() {
  try {
    x.forEach((p) => {
      cleanPackage(p);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
