import MUIJson from '../../package.json';
import DEMOJson from '../../../react-renderer-demo/package.json';

describe('package.json', () => {
  it('mui-mapper has the same version as react-renderer-demo', () => {
    expect(MUIJson.devDependencies['@mui/material']).toEqual(DEMOJson.dependencies['@mui/material']);
    expect(MUIJson.devDependencies['@mui/icons-material']).toEqual(DEMOJson.dependencies['@mui/icons-material']);
  });
});
