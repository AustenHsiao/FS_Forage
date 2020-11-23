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
    /*//CREATE SESSION
    let nuSpot = app.use(
      session({
      store: new session.MemoryStore(),
      secret: 'somesecret',
      resave: false,
      saveUninitialized: false,
      cookie: {expires: new Date(253402300000000)}
      })
  );
  //SAVE INFO TO SESSION
    nuSpot.spotName = req.body.nameinput;
    nuSpot.species = req.body.speciesinput;
    nuSpot.details = req.body.detailsinput;
    nuSpot.location = req.body.spotlocation;

    console.log(nuSpot.spotName)
    console.log(nuSpot.species)
    console.log(nuSpot.details)
    console.log(nuSpot.location)
    */
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