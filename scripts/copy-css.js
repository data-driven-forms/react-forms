const glob = require('glob');
const path = require('path');
const { copyFileSync } = require('fs');

const packagePath = process.cwd();
const src = path.resolve(packagePath, './src');

function copyCss() {
  const directories = glob.sync(`${src}/*/`).filter((name) => !name.includes('/tests/'));

  directories.forEach((dir) => {
    const cssFiles = glob.sync(`${dir}/**/*.css`);

    cssFiles.forEach((file) => {
      const fileName = file.replace(/^.*src\//, '');

      copyFileSync(file, `./${fileName}`);
      copyFileSync(file, `./esm/${fileName}`);
    });
  });
}

function run() {
  try {
    copyCss();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
