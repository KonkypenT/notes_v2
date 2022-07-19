const {version: appVersion} = require('./package.json');
const fs = require('fs');
const plist = require('plist');
const PLATFORM = process.env.PLATFORM;
const BUILD = process.env.BUILD || "1";
const ENV = process.env.ENV || 'local';
const VERSION = process.env.APPSTORE ? appVersion : appVersion + '-' + ENV;

switch (PLATFORM) {
  case 'ios':
    updateIosVersion();
    break;
  case 'android':
    updateAndroidVersion();
    break;
  default:
    console.log('PLATFORM is not defined');
}

function updateIosVersion() {
  console.log(`Update iOS build number and version (CFBundleVersion = ${BUILD}, CFBundleShortVersionString = ${VERSION})`);
  const path = 'ios/App/App/Info.plist';
  let infoPlist = plist.parse(fs.readFileSync(path, 'utf8'));
  infoPlist["CFBundleVersion"] = BUILD;
  infoPlist["CFBundleShortVersionString"] = VERSION;
  fs.writeFileSync(path, plist.build(infoPlist));
}

function updateAndroidVersion() {
  console.log('Update Android build number (versionCode) to', BUILD);
  const path = 'android/app/build.gradle';
  let gradle = fs.readFileSync(path, 'utf8').toString();
  gradle = gradle.replace(/versionCode (.*)/, `versionCode ${BUILD}`)
  gradle = gradle.replace(/versionName (.*)/, `versionName "${VERSION}"`)
  fs.writeFileSync(path, gradle);
}
