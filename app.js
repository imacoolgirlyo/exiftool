const express = require('express'),
    http = require("http"),
    path = require("path"),
    app = express(),
    server = http.createServer(app),
    bodyParser = require('body-parser'),
    fileUpload = require('express-fileupload'),
    db = require('./db'),
    User = require('./model');
   
app.use(fileUpload());

const PORT = process.env.PORT || 8080;;

app.use(bodyParser.json() ); 
app.use(bodyParser.urlencoded({ extended: true }));

const moveFile = (file, name) => {
    return new Promise(function(resolve, reject){
        if(!file){
            reject(res.statuse(400).send('No files were uploaded'));
        }
        else {
            file.mv('./src/'+ name);
            resolve(name);
    }})
}

app.post('/upload', function(req, res){
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    let file = req.files.image;
    let fileName = file.name;
   
    moveFile(file, fileName)
        .then(filename => console.log(filename));

    res.send(req.files.mimetype);
    
})

const handleListening = ()=>  {
    console.log(`✅ Server Running on : http://localhost:8080`);
}

server.listen(PORT, handleListening);
app.use(express.static(path.join(__dirname, "public")));

