const path = require('path');
const fs = require('fs');




const createFile = ()=> {
  return new Promise((res)=> {
	

    let nameFile = [];
    fs.readdir(path.join(__dirname) + '/styles',  (err, files) => { 
      if (err) return console.error(err.message);
      for (let i = 0; i < files.length; i++) {
        if(path.extname(files[i]) == '.css'){
          nameFile.push(files[i]);
        }
				
      }
      res(nameFile);
	
    });
  });
};


const bundleFileCreatre = async ()=> {

  const files = await createFile();
  const bundleArray = [];
  fs.open(path.join(__dirname) + '/project-dist/bundle.css', 'w', (err)=> {
    if (err) return console.error(err.message);
  });
  files.forEach(file => {
    fs.readFile(path.join(__dirname) + '/styles/' + file, 'utf8', function (err, fileContent) {
      if (err) return console.error(err.message);
      bundleArray.push(fileContent);
      fs.writeFile(path.join(__dirname) + '/project-dist/bundle.css', `${bundleArray.join(' ')}`, (err) => {
        if (err) throw err;
      });
			
    });
		
		
	
	
  });
	
};
bundleFileCreatre();
