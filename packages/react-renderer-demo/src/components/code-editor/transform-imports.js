const tranformImports = (content, env) => {
  if (env === 'umd') {
    return content;
  }

  let newContent = content;

  const regexp = RegExp('import.*data-driven-forms.*', 'g');
  let match;
  const matches = [];

  // matchAll is not supported in node <12
  while ((match = regexp.exec(content)) !== null) {
    matches.push(match[0]);
  }

  matches.forEach((m) => {
    const pck = m.match(/'.*'/)[0].replace(/'/g, '');

    const imports = m
      .replace(/(import|from.*|{|}| *)/g, '')
      .split(',')
      .map(
        (imp) =>
          `import ${imp} from '${pck}/dist/${env}/${imp
            .split(/(?=[A-Z])/)
            .join('-')
            .toLowerCase()}';`
      )
      .join('\n');

    newContent = newContent.replace(m, imports);
  });

  return newContent;
};

export default tranformImports;
