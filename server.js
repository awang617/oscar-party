const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

const db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

/*
 * JSON API Endpoints
 */

// [] api get route
// [] categories get route
// [] categories get by id rout
// [] movies get route
// [] movie get by id route
// [] movie delete by id route
// [] movie post route
// [] movie put by id route 


 app.get('/api', (req, res) => {
     res.json();
 })

 app.get('/api/category', (req, res) => {
     res.json();
 })

 app.get('/api/category/:id', (req, res) => {

 })

 app.get('/api/movie', (req, res) => {

 })

 app.get('/api/movie/:id', (req, res) => {

 })

 app.post('/api/movie', (req, res) => {

 })

 app.put('/api/movie/:id', (req, res) => {

 })

 app.delete('/api/movie/:id', (req, res) => {

 })

 /**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, () => {
    console.log('Express server is up and running on http://localhost:3000/');
  });