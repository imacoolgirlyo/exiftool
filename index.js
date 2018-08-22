const express = require('express'),
    fs = require('fs'),
    http = require("http"),
    path = require("path"),
    app = express(),
    server = http.createServer(app),
    fileUpload = require('express-fileupload'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    Promise = require('promise'),
    exif   = require(process.cwd() + '/lib/exiftool.js'),
    expect = require('chai').expect;


const PORT = 4000;


app.use(bodyParser.json() ); 
app.use(bodyParser.urlencoded({ extended: true }));

app.use(fileUpload());

const MoveFile = (file, name) => {
    file.mv('./src/' + name)
}

const readFile = (filename) => {
   return new Promise(function(resolve, reject){
    fs.readFile('./src/'+ filename, (err, res)=> {
        err ? reject(err) : resolve(filename);
    })
   });}


const useExif = (data) => {
   return new Promise(function(resolve, reject){
       exif.metadata(data, (err, res) => {
           err? reject(err) : resolve(console.log(res));
       })
   })
}

const insertDB = (metadata) => {
    console.log(metadata);
}
   


app.post('/upload', function(req, res, next){
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    let uploadedFile = req.files.filename,
        fileName = uploadedFile.name;
    
//    MoveFile(uploadedFile, fileName);

    res.send("file is uploaded !");

    setTimeout(function(){
        console.log("this is Async function.");
    }, 3000);

    console.log('this is console');


});



// 파일이 업로드 되었으면, src파일로 옮기고, then 해당 파일을 exif.metadata로 읽기


const handleListening = ()=>  {
    console.log(`✅ Server Running on : http://localhost:${PORT}`);
}

server.listen(PORT, handleListening);
app.use(express.static(path.join(__dirname, "public")));

