const fs = require('fs');

// BEGIN
const upVersion = (filepath, semver = 'patch') => {
  const data = fs.readFileSync(filepath, 'utf-8');
  const packageJson = JSON.parse(data);

  let major; let minor; let
    patch;
  [major, minor, patch] = packageJson.version.split('.');

  if (semver === 'major') {
    major++;
    minor = 0;
    patch = 0;
  } else if (semver === 'minor') {
    minor++;
    patch = 0;
  } else if (semver === 'patch') {
    patch++;
  }
  packageJson.version = [major, minor, patch].join('.');

  fs.writeFileSync(filepath, JSON.stringify(packageJson), 'utf-8');

  return packageJson.version;
};
// END

module.exports = { upVersion };
