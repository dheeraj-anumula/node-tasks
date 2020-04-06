const fs = require('fs');
const isDirectory=require('./src/validate-path');
const walkDirectory= require('./src/walk-directory')

const path = process.argv[2];

if(isDirectory(path)){
    walkDirectory(path).catch(console.error);
}
