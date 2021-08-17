const fs = require('fs');
const util = require('util');
const path = require('path')

const readDirPromise = util.promisify(fs.readdir);
const renameFilePromise = util.promisify(fs.rename);

const replaceAllFiles = async (fromDirectory, toDirectory) => {
    readDirPromise(fromDirectory).then((files) => {
        files.map((file) => {
            if (path.extname(file)) {
                renameFilePromise(`${fromDirectory}/${file}`, `${toDirectory}/${file}`)
                    .catch((err) => {
                        console.log('Something wrong, and reason is ', err);
                    });
            }
            if (!path.extname(file)) {
                replaceAllFiles(`${fromDirectory}/${file}`, toDirectory);
                return;
            }
        });
    });
};

replaceAllFiles('files', 'output');
