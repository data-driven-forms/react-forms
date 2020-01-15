const createIconsTransformPlugin = [
    'transform-imports',
    {
        '@patternfly/react-icons': {
            transform: (importName) =>
                `@patternfly/react-icons/dist/js/icons/${importName.split(/(?=[A-Z])/).join('-').toLowerCase()}`,
            preventFullImport: true,
        },
    },
];


module.exports = {
    "presets": ["@babel/preset-env", "@babel/preset-react"],
    "plugins": ["@babel/plugin-syntax-dynamic-import", "lodash", "@babel/plugin-proposal-class-properties", createIconsTransformPlugin ]
}
