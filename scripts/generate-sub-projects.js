const glob = require('glob');
const path = require('path');
const fse = require('fs-extra');

const packagePath = process.cwd();
const src = path.resolve(packagePath, './src');
const packageJsonPath = path.resolve(packagePath, 'package.json');

async function generateSubProjects() {
  const packageJson = await fse.readJSON(packageJsonPath);
  const packageName = packageJson.name;
  const packageDir = path.basename(packagePath);

  const directories = glob
    .sync(`${src}/*/`)
    .filter((name) => !name.includes('/tests/'))
    .map((path) =>
      path
        .replace(/\/$/, '')
        .split('/')
        .pop()
    );

  const cmds = directories.map((dir) => {
    const projectJson = {
      $schema: '../../../node_modules/nx/schemas/project-schema.json',
      name: `${packageName}/${dir}`,
      root: `packages/${packageDir}/${dir}`,
      sourceRoot: `packages/${packageDir}/src/${dir}`,
      projectType: 'library'
    };

    return fse.writeJSON(
      path.resolve(packagePath, dir, 'project.json'),
      projectJson,
      { spaces: 2 }
    );
  });

  return Promise.all(cmds);
}

async function run() {
  try {
    await generateSubProjects();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
