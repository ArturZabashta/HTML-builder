const fs = require('fs');
const path = require('path');

const srcDirPath = path.join(__dirname, 'styles');
const distDirPath = path.join(__dirname, 'project-dist');

fs.readdir(srcDirPath, { withFileTypes: true }, (err, srcData) => {
  if (err) {
    console.log(err.message);
  }
  
  const output = fs.createWriteStream(path.join(distDirPath, 'bundle.css'),);
  

  srcData.forEach((file) => {
    if (file.isFile() && path.parse(path.join(srcDirPath, file.name)).ext.slice(1) === 'css') {
      
      const input = fs.createReadStream(path.join(srcDirPath, file.name), 'utf-8');
      input.on('data', chunk => output.write(chunk));
      input.on('error', error => console.log('Error', error.message));

    }
  })
})