const fs = require('fs');
const path = require('path');


 
const createFile = () => {
  fs.readdir('./04-copy-directory/files', async  (err, files) => {
    if (err) console.log(err);
    else {
      fs.mkdir(path.join(__dirname, './files-copy/') , { recursive: true }, err => {
        if (err) throw err;
      });
		
      await new Promise((response) => {    
        fs.readdir(path.join(__dirname, './files-copy/'), (error, files) => {
          if (error) return console.error(error.message);
          if (files.length == 0) response();
          for (let file of files) {
            fs.unlink(path.join(__dirname, './files-copy/') + file, (error => {
              if (error) return console.error(error.message);
              response();
            }));
          }
        });
      });
      files.forEach(file => {
        fs.copyFile(path.join(__dirname, './files/' ) + file, path.join(__dirname, './files-copy/') + file, err => {
          if (err) throw err;
        });
      });
	
    }
  });
};

createFile();