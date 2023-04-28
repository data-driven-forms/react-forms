const camelToSnake = (string) => {
    return string
      .replace(/[\w]([A-Z])/g, function(m) {
        return m[0] + '-' + m[1];
      })
      .toLowerCase();
  };

module.exports = {
    presets: ["@babel/preset-env", "@babel/preset-react", ["@babel/preset-typescript", {allowNamespaces: true}]],
    plugins: [
      "@babel/plugin-transform-runtime",
      "@babel/plugin-syntax-dynamic-import",
      "@babel/plugin-proposal-class-properties",
      [
        'transform-imports',
        {
        '@data-driven-forms/react-form-renderer': {
            transform: (importName) => `@data-driven-forms/react-form-renderer/${camelToSnake(importName)}`,
            preventFullImport: true
          }
        },
        '@data-driven-forms/react-form-renderer'
    ]]
}
