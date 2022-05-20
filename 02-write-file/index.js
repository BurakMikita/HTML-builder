const path = require('path');
const { stdin, stdout  } = process;
const fs = require('fs');



stdout.write('Введите любой текст\n');
fs.stat(path.join(__dirname,  'text.txt'), function(err) {
  if(err == null) {
    fs.truncate(path.join(__dirname,  'text.txt'), err => {
      if(err) throw err; // не удалось очистить файл
    
    });
  } else if(err.code === 'ENOENT') {
    init();
  } else {
    console.log('Some other error: ', err.code);
  }
});
const init = () => {
  fs.open(path.join(__dirname,  'text.txt'), 'w', (err) => {
    if(err) throw err; 
  });
};


stdin.on('data', data => {

  createFile(data);
 
 
 
});



const createFile = (text) => {

	
  let ema = text.toString().trim();
  if(ema == 'exit'){
    process.exit();
  }

  fs.readFile(path.join(__dirname,  'text.txt'),  'utf-8', (error, data) => {
    if (error) return console.error(error.message);
    let sum = data + ' '+ ema;
    fs.writeFile(path.join(__dirname,  'text.txt'), sum, (error) => {
      if (error) return console.error(error.message);
      console.log('Запись созадана');
    });
	
  });

	

};

const handler = () => {
	
  process.exit();
};


process.on('SIGINT',handler);
process.on('exit', () => stdout.write('Удачи!'));

