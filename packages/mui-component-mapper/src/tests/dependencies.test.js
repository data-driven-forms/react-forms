import MUIJson from '../../package.json';
import DEMOJson from '../../../react-renderer-demo/package.json';

describe('package.json', () => {
  it('mui-mapper has the same version as react-renderer-demo', () => {
    expect(MUIJson.devDependencies['@material-ui/core']).toEqual(DEMOJson.dependencies['@material-ui/core']);
    expect(MUIJson.devDependencies['@material-ui/icons']).toEqual(DEMOJson.dependencies['@material-ui/icons']);
    expect(MUIJson.devDependencies['@material-ui/styles']).toEqual(DEMOJson.dependencies['@material-ui/styles']);
  });
});
