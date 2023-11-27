const fs = require('fs');

const createNewFile = (name, content) => {
    fs.writeFile(name, content, (err) => {
        if (err) {
            console.error(err);
        }
        console.log(`File "${name}" created successfully.`);
    });
};

// Function to read a file
const readFile = (name) => {
    fs.readFile(name, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(data);
    });
};

module.exports = {
    createNewFile,
    readFile,
};