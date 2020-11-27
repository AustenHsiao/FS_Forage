const express = require('express');
//const session = require('express-session');
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

app.post('/index.html', (req, res) => {
    res.status(200);
    res.sendFile(path.join(__dirname + '/pages/index.html'));
});

app.get('/index_mobile.html', (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname + '/pages/index_mobile.html'));
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

app.get('/spot_detail_mobile.html:id', function(req, res) {
  console.log(`dynamic url is being received as intended`)
//  var id = req.params.id; 
  res.status(200);
  res.set({'Content-Type': 'text/html'})
  res.sendFile(path.join(__dirname + '/pages/spot_detail_mobile.html'));
  res.end();
 });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});