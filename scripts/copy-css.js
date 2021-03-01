const glob = require('glob');
const path = require('path');
const { copyFileSync } = require('fs');

const packagePath = process.cwd();
const src = path.resolve(packagePath, './src');

async function copyCss() {
  const directories = glob.sync(`${src}/*/`).filter((name) => !name.includes('/tests/') && !name.includes('/common/'));

  directories.forEach(async (dir) => {
    const cssFiles = glob.sync(`${dir}/**/*.css`);

    cssFiles.forEach(async (file) => {
      const fileName = file.replace(/^.*src\//, '');

      copyFileSync(file, `./${fileName}`);
      copyFileSync(file, `./esm/${fileName}`);
    });
  });
}

async function run() {
  try {
    await copyCss();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
