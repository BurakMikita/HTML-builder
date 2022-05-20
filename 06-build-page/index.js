const fs = require('fs');
const path = require('path');



const  addmeinFile = async ()=> {
  fs.mkdir(path.join(__dirname, '/project-dist') , { recursive: true }, err => {
    if (err) throw err;
  });
};

addmeinFile();
 


const createFileAssets = async () => {
  fs.mkdir(path.join(__dirname, '/project-dist/assets'),  { recursive: true } , err => { if (err) throw err; });
  fs.readdir(path.join(__dirname, '/assets'), async  (err, files) => {
    if (err) console.log(err);
    else {
      files.forEach(file => {
        let static =  path.join(__dirname, '/assets/' + file);
        let copyFile = path.join(__dirname, '/project-dist/assets/' + file);
        addFilesAssets (static, copyFile);
		
			
      });


    }
  });
};

createFileAssets ();

const addFilesAssets = async (static, copyFile)=> {
  fs.mkdir(path.join(copyFile),  { recursive: true } , err => { if (err) throw err; });

  fs.readdir(path.join(static), async  (err, files) => {
    if (err) console.log(err); 
    else {
      files.forEach(file=> {
        fs.copyFile(
          path.join(static + '/' + file) ,
          path.join(copyFile + '/' + file) ,
          err => { if (err) console.log(err); });
      });
    }
  });
};


const createCssFile = ()=> {
  return new Promise((res)=> {
 
    let nameFile = [];
    fs.readdir(path.join(__dirname) + '/styles',  (err, files) => { 
      if (err) return console.error(err.message);
      for (let i = 0; i < files.length; i++) {
        if(path.extname(files[i]) == '.css'){
          nameFile.push(files[i]);
        }
      }
      res(nameFile); });
  });
};
 
 
const copyCssFile = async ()=> {
 
  const files = await createCssFile();
  const bundleArray = [];
  fs.open(path.join(__dirname) + '/project-dist/style.css', 'w', (err)=> {
    if (err) return console.error(err.message);
  });
  files.forEach(file => {
    fs.readFile(path.join(__dirname) + '/styles/' + file, 'utf8', function (err, fileContent) {
      if (err) return console.error(err.message);
      bundleArray.push(fileContent);
      fs.writeFile(path.join(__dirname) + '/project-dist/style.css', `${bundleArray.join(' ')}`, (err) => {
        if (err) throw err;
      });
    });

  });
};

copyCssFile();



 



const AddHtmlFile = (name) => {
  return new Promise((res) => {
    fs.readFile(__dirname + '/components/' + name, (error, file) => {
      if (error) throw error;
			
      fs.readFile(__dirname + '/project-dist/index.html', (error, data) => {
        if (error) throw error;
        let str =  data.toString();
        let arr =name.split('.');
        let value = str.replace(`{{${arr[0]}}}`, file);
        fs.writeFile(__dirname + '/project-dist/index.html', value, (err) => {
          if (err) throw err;
          res();
        });
      });
				

    });
  });

		
};
 
const readComponents =  () => {
  fs.open(path.join(__dirname) + '/project-dist/index.html', 'w', (err)=> {
    if (err) return console.error(err.message);
  });
  fs.copyFile(__dirname + '/template.html', __dirname + '/project-dist/index.html',(err)=>{
    if (err) throw err;
  });
  fs.readdir(__dirname + '/components', async (err, files) => {
    if (err) throw err;
    else {

		
      for (const file of files) {
        await AddHtmlFile(file);
      }
		
    }
  });
};

readComponents();