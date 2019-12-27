var fs= require("fs");
const argv=require('yargs').argv
//console.log("argv",argv);
var name=process.argv[2];
console.log("name",name);
//const prompt=require('prompt-sync')();


var data="You are awesome."
//var name=prompt('Enter filename:');
var check=true;

const file_names = fs.readFileSync('filenames.txt', 'utf8')
var files=file_names.split(" ");
//console.log(files)
for(index=1;index<files.length;index++){
    //console.log("filename:",files[index]);
    //console.log("currname:",name);
    if(files[index]==name){
        
        check=false;
        break;
    }
}
if(check==true){
    fs.appendFile("filenames.txt",(" "+name),(err)=>{
        if(err) console.log(err);
        console.log("Successfully written to filenames");
    });
    
    fs.writeFile(name,data,(err)=>{
        if(err) console.log(err);
        console.log("Successfully written to the new file");
    });
}
else{
    console.log("Filename already exists. Unable to create the file.");
}


