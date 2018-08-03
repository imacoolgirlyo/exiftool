const express = require('express'),
    fileupload = require('express-fileupload'),
    http = require("http"),
    path = require("path"),
    app = express(),
    server = http.createServer(app);


const PORT = 4000;

const handleListening = ()=>  {
    console.log(`✅ Server Running on : http://localhost:${PORT}`);
}

app.use(fileupload());

const fileUpload = (req, res) =>{
    console.log(req);
}

app.post('/upload', fileUpload);

server.listen(PORT, handleListening);
app.use(express.static(path.join(__dirname, "public")));