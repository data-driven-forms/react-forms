const fs = require('fs');
const resolve = require('path').resolve;
const glob = require('glob');
const shell = require('shelljs');

const mapper = process.env.MAPPER;

const pagesFileNames = glob.sync(resolve(__dirname, `../pages/renderer/*.md`));
const examplesFileNames = [...glob.sync(resolve(__dirname, `../examples/**/*.js`)), ...glob.sync(resolve(__dirname, `../examples/**/*.css`))];

const pagesTargetDir = resolve(__dirname, `../pages/${mapper}`);

if (!fs.existsSync(pagesTargetDir)) {
  fs.mkdirSync(pagesTargetDir);
  fs.mkdirSync(`${pagesTargetDir}/renderer`);
}

function copyPageFile(fileName, targetFile) {
  fs.readFile(fileName, 'utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }

    let result = data.replace(/from '@data-driven-forms\/mui-component-mapper/g, `from '@data-driven-forms/${mapper}-component-mapper`);
    result = result.replace(/source="/g, `source="${mapper}/`);

    fs.writeFile(targetFile, result, 'utf8', function(err) {
      if (err) {
        return console.log('error when writing file: ', err);
      }
    });
  });
}

pagesFileNames.forEach((fileName) => {
  const targetFile = fileName.replace('pages/renderer', `pages/${mapper}/renderer`);
  copyPageFile(fileName, targetFile);
});

examplesFileNames.forEach((fileName) => {
  const source = fileName;
  const target = fileName.replace('/examples/', `/examples/${mapper}/`);
  const targetDirectory = target
    .split('/')
    .slice(0, target.split('/').length - 1)
    .join('/');
  if (!fs.existsSync(targetDirectory)) {
    shell.mkdir('-p', targetDirectory);
  }

  fs.readFile(source, 'utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }

    let result = data.replace(/from '@data-driven-forms\/mui-component-mapper/g, `from '@data-driven-forms/${mapper}-component-mapper`);

    fs.writeFile(target, result, 'utf8', function(err) {
      if (err) {
        return console.log('error when writing file: ', err);
      }
    });
  });
});
