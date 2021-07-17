const fs = require('fs');
const path = require('path');
const { upVersion } = require('../src/index.js');

// BEGIN
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const readVersion = (filepath) => {
  const data = fs.readFileSync(filepath, 'utf-8');
  const packageJson = JSON.parse(data);

  return packageJson.version;
};

const defaultFixture = {
  version: '1.3.2',
};

describe('upVersion() function', () => {
  afterEach(() => {
    fs.writeFileSync(getFixturePath('package.json'), JSON.stringify(defaultFixture), 'utf-8');
  });

  test.each([
    ['patch', '1.3.3'],
    ['minor', '1.4.0'],
    ['major', '2.0.0'],
  ])('%s should increment version to be %s', (semver, expected) => {
    const fixture = getFixturePath('package.json');

    const newVersion = upVersion(fixture, semver);

    expect(newVersion).toBe(expected);
  });

  it('should rewrite the version in the file', () => {
    const fixture = getFixturePath('package.json');

    const versionBefore = readVersion(fixture);
    upVersion(fixture);
    const versionAfter = readVersion(fixture);

    expect(versionAfter).not.toBe(versionBefore);
  });
});
// END
