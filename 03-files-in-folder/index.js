const fs = require('fs');
const path = require('path');

const puthNew = path.join(__dirname,  'secret-folder/');


fs.readdir(puthNew, {withFileTypes: true},(error, files)=> {
  if (error) return console.error(error.message);
  else {
    for (let i = 0; i < files.length; i++) {
      if(files[i].isFile()){
        let name = files[i].name;
        let extension = path.extname(files[i].name);
        fs.stat(puthNew + name, (err, stats) => {
          if (error) return console.error(error.message);
          let arr = 	name.split('.');
          console.log('Имя файла '+ arr[0] + ' Формат ' + extension + ' Размер '+ stats.size + ' bite');
        });		  
      }
			
    }
  }
});
