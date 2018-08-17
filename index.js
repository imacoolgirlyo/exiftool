const express = require('express'),
    fs = require('fs'),
    http = require("http"),
    path = require("path"),
    app = express(),
    server = http.createServer(app),
    fileUpload = require('express-fileupload'),
    bodyParser = require('body-parser'),
    multer = require('multer');


const PORT = 4000;



app.use(bodyParser.json() ); 
app.use(bodyParser.urlencoded({ extended: true }));

app.use(fileUpload());
app.get('/topic/:id', function(req, res){
    const topics = [
        'JavaScript !',
        'Node JS !',
        'Express!'
    ]

    const output = `
    <a href="/topic?id=0"> JavaScript</a> </br>
    <a href="/topic?id=1"> Nodejs</a> </br>
    <a href="/topic?id=2"> Express</a> </br>

    ${topics[req.params.id]}

    `
    res.send(output);
})


// app.get('/upload' ,function(req, res){
//     res.send(req.query.filename);
// })

app.post('/upload', function(req, res){
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    let uploadedFile = req.files.filename,
        fileName = uploadedFile.name;

    uploadedFile.mv('./src/'+ fileName, function(err){
        if(err)
            return res.status(500).send(err);

        res.send('File uploaded !!');
    })
})


const handleListening = ()=>  {
    console.log(`✅ Server Running on : http://localhost:${PORT}`);
}

server.listen(PORT, handleListening);
app.use(express.static(path.join(__dirname, "public")));

