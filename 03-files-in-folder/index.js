const fs = require('fs');
const path = require('path');
const dirPath = path.join(__dirname, 'secret-folder');

fs.readdir(dirPath, {withFileTypes: true}, (err, dataArray) => {
  if (err) {
    console.log(err.message);
  }
  
  dataArray.forEach((item) => {
    if (!item.isDirectory()) {
    const itemName = path.parse(path.join(dirPath, item.name)).name;
    const itemExt = path.parse(path.join(dirPath, item.name)).ext.slice(1);
    
    fs.stat(path.join(dirPath, item.name), (err, stats) => {
      if (err) {
        console.log(err.message);
      }
      let itemSize = stats.size /1024;
      console.log(`${itemName} - ${itemExt} - ${itemSize}kb`)
      return stats.size
    });    

    }
  }) 
})