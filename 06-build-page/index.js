const fs = require('fs');
const path = require('path');

const componentPath = path.join(__dirname, 'components');
const assetsPath = path.join(__dirname, 'assets');
const stylesPath = path.join(__dirname, 'styles');
const distDirPath = path.join(__dirname, 'project-dist');


fs.rm(distDirPath, { recursive: true }, () => {


  fs.mkdir(distDirPath, { recursive: true }, (err) => {
    if (err) {
      console.log(err.message);
    } else {
  
      function copyAssetsFolder(from, to) {
        
        fs.mkdir(to, { recursive: true }, (err) => {
          if (err) {
            console.log(err.message);
          } 
            fs.readdir(from, { withFileTypes: true }, (err, assetElement) => {
              if (err) {
                console.log(err.message);
              } else {
                
                assetElement.forEach((element) => {
                  if (element.isFile()) {
                      fs.copyFile(path.join(from, element.name), path.join(to, element.name), (err) => {
                        if (err) {
                          console.log(err.message);
                        }
                      });
                  } else {
                    copyAssetsFolder(path.join(from, element.name), path.join(to, element.name));
                  }
                });
              }
  
            })
            }
            
          )      
      }
      copyAssetsFolder(path.join(__dirname, 'assets'), path.join(distDirPath, 'assets'))
  
  
      function makeStyleBundle() {
        fs.mkdir(path.join(distDirPath), { recursive: true }, (err) => {
          if (err) {
            console.log(err.message);
          } else {
        
            fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, (err, srcData) => {
              if (err) {
                console.log(err.message);
              }
              
              const output = fs.createWriteStream(path.join(distDirPath, 'style.css'),);            
            
              srcData.forEach((file) => {
                if (file.isFile() && path.parse(path.join(__dirname, 'styles', file.name)).ext.slice(1) === 'css') {
                  
                  const input = fs.createReadStream(path.join(__dirname, 'styles', file.name), 'utf-8');
                  input.on('data', chunk => output.write(chunk));
                  input.on('error', error => console.log('Error', error.message));
            
                }
              })
            })
          }
        })
      }
      makeStyleBundle()
  
      let hashComponents = {};
  
      function readComponents() {
        
        fs.writeFile(path.join(distDirPath, 'index.html'), '', (err) => {
          if (err) {
            console.log(err.message);
          }
          
          
          fs.readdir(componentPath, { withFileTypes: true }, (err, componentData) => {
            if (err) {
              console.log(err.message);
            }
            
            componentData.forEach((file) => {
              if (file.isFile()) {
                let pathFile = path.join(componentPath, file.name);
                let fileName = path.parse(componentPath + '/' + file.name).name;
                fs.readFile(pathFile, (err, data) => {
                  if (err) throw err;
                  
                  hashComponents[fileName] = data.toString();
                  makeIndexHtml();
                });
              }
            });          
          });
          
        }); 
      }
      readComponents()
  
      function makeIndexHtml() {

        fs.readFile(path.join(__dirname, 'template.html'), (err, templateData) => {
          if (err) {
            console.log(err.message);
          }
  
          let templateStr = templateData.toString();
          let templateArray = templateStr.split('\n');
          let cashHTMLnames = Object.keys(hashComponents);
  
          for (let i = 0; i < templateArray.length; i++) {
            let elem = templateArray[i].trim();
            cashHTMLnames.forEach((item) => {
              if (elem.indexOf(item) !== -1) {
                //console.log(array[i]);
                templateArray[i] = hashComponents[item];
              }
            });
          }
          //    перезаписываем файл index.html
          fs.writeFile(path.join(distDirPath, 'index.html'), templateArray.join('\n'), (err) => {
            if (err) {
              console.log(err.message)};
          });
  
  
        }) 
      }
  
  
  
  
  
  
  
    }
  })

  
})


