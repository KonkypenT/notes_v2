const { version: appVersion } = require('./package.json');
const fs = require('fs');
const getRepoInfo = require('git-repo-info');

const fileOriginal = fs.readFileSync('capacitor.config.json', 'utf8');
const url = process.env.NODE_ENV === 'tst' ? '188.225.44.50:3000' : '188.225.44.50:3000';
const appId = process.env.NODE_ENV === 'tst' ? 'ru.events' : 'ru.events';

const obj = JSON.parse(fileOriginal);
obj.server = { hostname: url };
obj.appId = appId;
fs.writeFileSync('capacitor.config.json', JSON.stringify(obj, null, 2));


console.log('Generate build-info.js');
const env = process.env.ENV || 'local';
const branch = process.env.BRANCH || null;
const git = getRepoInfo();
const build = +process.env.BUILD || 1;

const info = {
  info: {
    version: appVersion,
    env,
    branch: branch || git.branch,
    commit: git.sha,
    commitDate: git.committerDate,
    build,
  },
};

const infoData = JSON.stringify(info);

fs.writeFileSync(`${__dirname}/src/assets/build-info.json`, infoData, {
  encoding: 'utf8',
});
