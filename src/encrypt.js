const fs = require('fs');
const crypto = require('crypto');

const logStream=fs.createWriteStream(process.argv[2]+'\\log.txt', {flags: 'a'});

function encrypt(filePath) {

    const sha1Hash = crypto.createHash('sha1');
    const md5Hash = crypto.createHash('md5');
    const input = fs.createReadStream(filePath);
    input.on('readable', () => {

        const data = input.read();
        if (data){
            sha1Hash.update(data);
            md5Hash.update(data);
        }
        else {
            logStream.write(`${filePath} ${sha1Hash.digest('hex')} ${md5Hash.digest('hex')}\n`);
        }
    });
}

module.exports = encrypt;