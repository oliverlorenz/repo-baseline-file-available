const Promise = require('bluebird');
const fs = require('fs');
const path = require('path')
const packageJson = require('../package.json')

module.exports = function(pluginManager, repoPath, config) {
    function run(callback, level, options) {
        if (!options) {
            return Promise.reject(new Error('options have to be defined!'));
        }
        let isCheckFullyValid = true;
        options.files.forEach(fileToCheck => {
            const fullFilePath = path.join(
                repoPath,
                fileToCheck
            );

            let isFileAvailable = false
            try {
                isFileAvailable = fs.statSync(fullFilePath).isFile();
            } catch (err) {
                isCheckFullyValid = false;
            }
            callback(`"${fileToCheck}" is available`, isFileAvailable);
        });

        if (!isCheckFullyValid) {
            return Promise.reject(`${packageJson.name} violated`)
        }
        return Promise.resolve();
    }
    return { run }
}