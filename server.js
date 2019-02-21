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

app.get('/ballot', function ballotPage(req, res) {
    res.sendFile(__dirname + '/views/ballot.html');
});

/*
 * JSON API Endpoints
 */

// [x] api get route
// [x] categories get route
// [x] categories get by id rout
// [x] movies get route
// [x] movie get by id route
// [] movie delete by id route
// [] movie post route
// [] movie put by id route


 app.get('/api', (req, res) => {
     res.json({
         message: 'Welcome to the 2019 Oscar Party! Are you ready to choose your winners for each category?',
         documentationUrl: 'https://github.com/awang617/oscar-party/blob/master/README.md',
         baseUrl: 'heroku app url goes here', //UPDATE LATER
         endpoints: [
             {method: 'GET', path: '/api', description: 'Describes all endpoints'},
             {method: 'GET', path: '/api/category', description: 'See all the categories of the 2019 Oscars'},
             {method: 'GET', path: '/api/category/:id', description: 'Find a single category'},
             {method: 'GET', path: '/api/movie', description: 'See all the movies'},
             {method: 'GET', path: '/api/movie/:id', description: 'Find a single movie by id'},
             {method: 'POST', path: '/api/movie', description: 'Create a new movie'},
             {method: 'PUT', path: '/api/movie/:id', description: 'Update a movie'},
             {method: 'DELETE', path: '/api/movie/:id', description: 'Delete a movie'}
         ]
     });
 });

 app.get('/api/category', (req, res) => {
     db.Category.find().populate('movies').exec((err, foundCategories) => {
         if (err) {console.log(err)}
         res.json(foundCategories)
     })
});

 app.get('/api/category/:id', (req, res) => {
     const categoryId = req.params.id;
     db.Category.findOne({_id: categoryId}).populate('movies').exec((err, foundCategory) => {
         if (err) {console.log(err)}
         res.json(foundCategory);
     });
 });

 app.get('/api/movie', (req, res) => {
    db.Movie.find( (err, foundMovies) => {
        if (err) {console.log(err)}
        res.json(foundMovies)
    });
 });

 app.get('/api/movie/:id', (req, res) => {
     const movieId = req.params.id;

     db.Movie.findOne({_id: movieId}, (err, foundMovie) => {
         if (err) {console.log(err)}
         res.json(foundMovie)
     });
 });

// bogus post route used for testing the patch route
// can deleted later if no longer needed
//  app.post('/api/testroute', (req, res) => {
//     const newMovie = new db.Movie({
//         name: req.body.name,
//         voteCount: req.body.voteCount,
//         userSubmitted: req.body.userSubmitted
//     });
//     newMovie.save((err, newMovie) => {
//         if (err) { console.log(err) }
//         res.json(newMovie);
//     });
// });

 app.post('/api/movie', (req, res) => {
    let userChoiceData = req.body.newMovieNames;

    userChoiceData.forEach(choice => {
        const newMovie = new db.Movie({
            name: choice.name,
            voteCount: choice.voteCount
        });
        newMovie.save((err, newMovie) => {
            if (err) { console.log(err) }
            res.json(newMovie);
        });
    })
 });

//  may want to change this to patch
 app.patch('/api/movie/:id', (req, res) => {
    const movieId = req.params.id;
    db.Movie.findOne({_id: movieId}, (err, foundMovie) => {
        if (err) {console.log(err)}
        let isUserSubmitted = foundMovie.userSubmitted;
        let plusOne = foundMovie.voteCount+1;
        if (isUserSubmitted) {
            db.Movie.findOneAndUpdate( {_id: movieId}, req.body, {new: true}, (err, updatedMovie) => {
                if (err) {console.log(err)}
                res.json(updatedMovie);
            })
        } else {
            db.Movie.findOneAndUpdate( {_id: movieId}, {voteCount: plusOne}, {new: true}, (err, updatedMovie) => {
                if (err) {console.log(err)}
                res.json(updatedMovie);
            })
        }
    })
 });

 app.delete('/api/movie/:id', (req, res) => {
     const movieId = req.params.id;
     db.Movie.findOneAndDelete( {_id: movieId}, (err, deletedMovie) => {
         if (err) {console.log(err)};
         res.json(deletedMovie);
     });
 });


//  route to get votecount page
app.get('/votes', function votecountPage(req, res) {
    res.sendFile(__dirname + '/views/votecount.html');
});

 /**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, () => {
    console.log('Express server is up and running on http://localhost:3000/');
  });
