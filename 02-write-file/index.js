const { stdin, stdout } = process;
const fs = require('fs');
const path = require('path');

stdout.write('\nEnter some text and press "Enter"dsf. If you want to exit, press "Ctrl+C" or type "exit" \n\n');

const output = fs.createWriteStream(path.join(__dirname, 'output.txt'),);


stdin.on('data', data => {
  let dataStr = data.toString();
  if (dataStr.trim().toLowerCase() == 'exit') {    
    process.exit();
  } else output.write(dataStr);
});
process.on('SIGINT', () => {process.exit();});  // CTRL+C
process.on('SIGQUIT', () => {process.exit();}); // Keyboard quit

process.on('exit', () => stdout.write('\nGoodbye. Thanks for your time. All data added to file "output.txt"'));