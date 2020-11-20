const express = require('express');
var bodyParser = require('body-parser');
var app = express();

//create application/x-www-form-urlendcoded parser
app.use(bodyParser.urlencoded({ extended: true }));

const path = require('path');
const port = process.env.PORT || 5000;

app.use('/', express.static(__dirname + '/pages'));
app.use('/', express.static(__dirname + '/css'));
  
app.get('/', (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname + '/pages/index.html'));
});

app.get('/add_spot.html',  (req, res) => {
  console.log("in add spot get");
  res.status(200);
  res.set({'Content-Type': 'text/html'})
  res.sendFile(path.join(__dirname + '/pages/add_spot.html'));
  res.end();
});
  
app.get('/add_spot_mobile.html',  (req, res) => {
  res.status(200);
  res.set({'Content-Type': 'text/html'})
  res.sendFile(path.join(__dirname + '/pages/add_spot_mobile.html'));
  res.end();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});













/*

//////////////////////////////////
const http = require('http'); 
const fs = require('fs');
const port = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
    const mainPage = fs.readFileSync('pages/index.html');
    const cssFile = fs.readFileSync('css/forage.css');

    switch (req.url) {
        case "/css/forage.css" :
            res.writeHead(200, {"Content-Type": "text/css"});
            res.write(cssFile);
            break;
        default :    
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write(mainPage);
    };
    res.end();
});

server.listen(port, () => {
    console.log(`Server running at on port:${port}`);
});

*/