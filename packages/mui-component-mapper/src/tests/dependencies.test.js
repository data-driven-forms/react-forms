import MUIJson from '../../package.json';

describe('package.json', () => {
  it('mui-mapper has required dependencies', () => {
    expect(MUIJson.devDependencies['@mui/material']).toBeDefined();
    expect(MUIJson.devDependencies['@mui/icons-material']).toBeDefined();
    expect(MUIJson.peerDependencies['@mui/material']).toBeDefined();
    expect(MUIJson.peerDependencies['@mui/icons-material']).toBeDefined();
  });
});
