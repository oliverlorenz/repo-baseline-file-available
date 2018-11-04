const blFileAvailable = require('../../src/index');

describe(__filename, () => {
    describe('reject if', () => {
        it('one file is not available', (done) => {
            const options = {
                files: [
                    'fileNotThere'
                ]
            }

            blFileAvailable.run(
                'test/unit/repo', 
                options, 
                function notImportantForTheTest() {}
            )
            .then(() => {
                done(new Error('should reject instead of resolve'))
            })
            .catch(() => {
                done()
            })
        })
        it('at least one file is not available', (done) => {
            const options = {
                files: [
                    'fileToCheck',
                    'fileNotThere'
                ]
            }

            blFileAvailable.run(
                'test/unit/repo', 
                options, 
                function notImportantForTheTest() {}
            )
            .then(() => {
                done(new Error('should reject instead of resolve'))
            })
            .catch(() => {
                done()
            })
        })
    })
    describe('resolve if', () => {
        it('all files are available', () => {
            const options = {
                files: [
                    'fileToCheck'
                ]
            }

            return blFileAvailable.run(
                'test/unit/repo', 
                options, 
                function notImportantForTheTest() {}
            )
        })
    })
})

/*
it('can handle multiple file1', () => {
    return bl.run('test/unit/repo', {
        files: [
            'fileToCheck'
        ]
    },
    (message, valid) => {
        console.log(message, valid);
    });
})*/