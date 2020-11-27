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

/*
function myFunction(x) {
  if (x.matches) { // If media query matches
    return true;
  } else {
    return false;
  }
}

var x = window.matchMedia("(max-width: 700px)")
myFunction(x) // Call listener function at run time
*/

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

app.get('/spot_detail_mobile.html', function(req, res) {
  res.status(200);
  res.set({'Content-Type': 'text/html'})
  res.sendFile(path.join(__dirname + '/pages/spot_detail_mobile.html'));  
  res.end();
 });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});