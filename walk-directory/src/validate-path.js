const fs = require('fs');
function isDirectory(dirPath) {

    if (fs.existsSync(dirPath)) {
        return fs.lstatSync(dirPath).isDirectory();
    }
    else {
        console.log('Error: The directory does not exist');
    }
}

module.exports = isDirectory;