const Promise = require('bluebird');
const fs = require('fs');
const path = require('path')

module.exports = {
    run: (repoPath, options, resultCallback) => {
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
            resultCallback(`"${fullFilePath}" is available`, isFileAvailable);
        });

        if (!isCheckFullyValid) {
            return Promise.reject()
        }
        return Promise.resolve();
    },
    getRules: () => []
}