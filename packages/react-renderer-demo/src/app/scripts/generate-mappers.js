const fs = require('fs');
const resolve = require('path').resolve;
const glob = require('glob');

const mapper = process.env.MAPPER;

const fileNames = glob.sync(resolve(__dirname, `../pages/renderer/*.md`));

const targetDir = resolve(__dirname, `../pages/${mapper}`);

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir);
  fs.mkdirSync(`${targetDir}/renderer`);
}

console.log(targetDir);

function copyFile(fileName, targetFile) {
  fs.readFile(fileName, 'utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }

    let result = data.replace(/from 'mui-component-mapper/g, `from '${mapper}-component-mapper`);

    fs.writeFile(targetFile, result, 'utf8', function(err) {
      if (err) {
        return console.log('error when writing file: ', err);
      }
    });
  });
}

fileNames.forEach((fileName) => {
  const targetFile = fileName.replace('pages/renderer', `pages/${mapper}/renderer`);
  copyFile(fileName, targetFile);
});
