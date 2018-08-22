const express = require('express'),
    http = require("http"),
    path = require("path"),
    app = express(),
    server = http.createServer(app),
    bodyParser = require('body-parser'),
    db = require('./db'),
    User = require('./model');
   


const PORT = process.env.PORT || 8080;;



app.use(bodyParser.json() ); 
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/upload', function(req, res){
    const name = req.body.user,
        age = req.body.age;

    User.create({
        name,
        age
    }, function(err, res){
        if(err) return handleError(err);
       
    })
    res.send(`My name is ${name} and I'm ${age}'s old` );
    
})

const handleGetUsers = (req, res) => {
    console.log('Get USER!');
    User.find().then(messages => res.json({messages}));
}



app.get('/users', handleGetUsers);

const handleListening = ()=>  {
    console.log(`✅ Server Running on : http://localhost:8080`);
}

server.listen(PORT, handleListening);
app.use(express.static(path.join(__dirname, "public")));

