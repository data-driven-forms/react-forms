const camelToSnake = (string) => {
    return string
      .replace(/[\w]([A-Z])/g, function(m) {
        return m[0] + '-' + m[1];
      })
      .toLowerCase();
  };

module.exports = {
    presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
    plugins: ["@babel/plugin-transform-runtime", "@babel/plugin-syntax-dynamic-import", "lodash", "@babel/plugin-proposal-class-properties" ],
    env: {
        cjs: {
            plugins: [
                [
                    'transform-imports',
                    {
                    '@data-driven-forms/react-form-renderer': {
                        transform: (importName) => `@data-driven-forms/react-form-renderer/dist/cjs/${camelToSnake(importName)}`,
                        preventFullImport: true
                    }
                    },
                    '@data-driven-forms/react-form-renderer-CJS'
                ],
            ]
        },
        esm: {
            plugins: [
                [
                  'transform-imports',
                  {
                    '@data-driven-forms/react-form-renderer': {
                      transform: (importName) => `@data-driven-forms/react-form-renderer/dist/esm/${camelToSnake(importName)}`,
                      preventFullImport: true
                    }
                  },
                  '@data-driven-forms/react-form-renderer-ESM'
                ],
            ]
        }
    }
}
