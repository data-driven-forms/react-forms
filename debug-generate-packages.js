const glob = require('glob');
const path = require('path');
const fse = require('fs-extra');

const packagePath = process.cwd();
const src = path.resolve(packagePath, './src');

console.log('packagePath:', packagePath);
console.log('src:', src);

async function generatePackages() {
  const directories = glob
    .sync(`${src}/*/`)
    .filter((name) => !name.includes('/tests/'))
    .map((path) =>
      path
        .replace(/\/$/, '')
        .split('/')
        .pop()
    );

  console.log('Found directories:', directories);

  directories.forEach((dir) => {
    const targetPath = path.resolve(packagePath, dir, 'package.json');
    const targetDir = path.resolve(packagePath, dir);
    console.log(`Directory: ${dir}`);
    console.log(`  Target dir: ${targetDir}`);
    console.log(`  Target path: ${targetPath}`);
    console.log(`  Directory exists: ${fse.existsSync(targetDir)}`);
  });

  // Don't actually write anything yet
  return Promise.resolve();
}

async function run() {
  try {
    await generatePackages();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();