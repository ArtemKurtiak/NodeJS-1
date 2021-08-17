const fs = require('fs');
const util = require('util');

const readDirPromise = util.promisify(fs.readdir);
const readFilePromise = util.promisify(fs.readFile);
const renameFilePromise = util.promisify(fs.rename);

const sortFiles = async (directory) => {
    const config = {
        directory,
        replaceDirectory: directory === 'boys' ? 'girls' : 'boys',
        correctGender: directory === 'boys' ? 'male' : 'female'
    }
    readDirPromise(directory).then((files) => {
        files.map(file => {
            readFilePromise(`${config.directory}/${file}`)
                .then(fileData => {
                    fileData = JSON.parse(fileData);
                    const gender = fileData.gender;
                    if (!(gender === config.correctGender)) {
                        renameFilePromise(`${config.directory}/${file}`, `${config.replaceDirectory}/${file}`)
                            .catch(err => {
                                console.log('Something wrong, and reason is ', err);
                            })
                        return;
                    }
                });
        });
    });
};

sortFiles('boys');
sortFiles('girls');
