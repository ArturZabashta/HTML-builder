const fs = require('fs');
const path = require('path');

const srcDirPath = path.join(__dirname, 'files');
const distDirPath = path.join(__dirname, 'files-copy');

  fs.mkdir(distDirPath, { recursive: true }, (err) => {
  if (err) {
    console.log(err.message);
  } else {

    fs.readdir(srcDirPath, { withFileTypes: true }, (err, srcData) => {
      if (err) {
        console.log(err.message);
      }
          
      srcData.forEach((file) => {
        if (file.isFile()) {
          
          fs.copyFile(
            srcDirPath + '/' + file.name,
            distDirPath + '/' + file.name,
            (err) => {
              if (err) {
                console.log(err.message);
              }
            }
          );
        }
      });

      fs.readdir(distDirPath, { withFileTypes: true }, (err, distData) => {
        if (err) {
          console.log(err.message);
        }        

        distData.forEach((distFile) => {
          let isFileNeed = false;

          srcData.forEach((srcFile) => {
            if (srcFile.name === distFile.name)  isFileNeed = true;
          })

          if (isFileNeed === false) {
            fs.unlink(distDirPath + '/' + distFile.name, function () {});
          }          
          
        })  
      })
    })
  }
})



  
