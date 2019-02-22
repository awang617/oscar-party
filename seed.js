// start our application with seed data

// requires all the database models
const db = require ('./models');

// categories
const category_list = [
  {
    name: 'Best Picture',
    movies: ['Black Panther', 'BlacKkKlansman', 'Bohemian Rhapsody', 'The Favourite', 'Green Book', 'Roma', 'A Star Is Born', 'Vice']
  },
  {
    name: 'Actor in a Leading Role',
    movies: ['Vice', 'A Star Is Born', "At Eternity's Gate", 'Bohemian Rhapsody', 'Green Book']
  },
  {
    name: 'Actress in a Leading Role',
    movies: ['Roma', 'The Wife', 'The Favourite', 'A Star Is Born', 'Can You Ever Forgive Me?']
  },
  {
    name: 'Actor in a Supporting Role',
    movies: ['Green Book', 'BlacKkKlansman', 'A Star Is Born', 'Can You Ever Forgive Me?', 'Vice']
  },
  {
    name: 'Actress in a Supporting Role',
    movies: ['Vice', 'Roma', 'If Beale Street Could Talk', 'The Favourite']
  },
  {
    name: 'Animated Feature Film',
    movies: ['Incredibles 2', 'Isle of Dogs', 'Mirai', 'Ralph Breaks the Internet', 'Spider-Man: Into the Spider-verse']
  },
  {
    name: 'Cinematography',
    movies: ['Cold War', 'The Favourite', 'Never Look Away', 'Roma', 'A Star Is Born']
  },
  {
    name: 'Costume Design',
    movies: ['The Ballad of Buster Scruggs', 'Black Panther', 'The Favourite', 'Mary Poppins Returns', 'Mary Queen of Scots']
  },
  {
    name: 'Directing',
    movies: ['BlacKkKlansman', 'Cold War', 'The Favourite', 'Roma', 'Vice']
  },
  {
    name: 'Documentary (Feature)',
    movies: ['Free Solo', 'Hale County This Morning, This Evening', 'Minding the Gap', 'Of Fathers and Sons', 'RBG']
  },
  {
    name: 'Documentary (Short Subject)',
    movies: ['Black Sheep', 'End Game', 'Lifeboat', 'A Night at The Garden', 'Period. End of Sentence.']
  },
  {
    name: 'Film Editing',
    movies: ['BlacKkKlansman', 'Bohemian Rhapsody', 'The Favourite', 'Green Book', 'Vice']
  },
  {
    name: 'Foreign Language Film',
    movies: ['Capernaum', 'Cold War', 'Never Look Away', 'Roma', 'Shoplifters']
  },
  {
    name: 'Makeup and Hairstyling',
    movies: ['Border', 'Mary Queen of Scots', 'Vice']
  },
  {
    name: 'Music (Original Score)',
    movies: ['Black Panther', 'BlacKkKlansman', 'If Beale Street Could Talk', 'Isle of Dogs', 'Mary Poppins Returns']
  },
  {
    name: 'Music (Original Song)',
    movies: ['Black Panther', 'RBG', 'Mary Poppins Returns', 'A Star Is Born', 'The Ballad of Buster Scruggs']
  },
  {
    name: 'Production Design',
    movies: ['Black Panther', 'The Favourite', 'First Man', 'Mary Poppins Returns', 'Roma']
  },
  {
    name: 'Short Film (Animated)',
    movies: ['Animal Behaviour', 'Bao', 'Late Afternoon', 'One Small Step', 'Weekends']
  },
  {
    name: 'Short Film (Live Action)',
    movies: ['Detainment', 'Fauve', 'Marguerite', 'Mother', 'Skin']
  },
  {
    name: 'Sound Editing',
    movies: ['Black Panther', 'Bohemian Rhapsody', 'First Man', 'A Quiet Place', 'Roma']
  },
  {
    name: 'Sound Mixing',
    movies: ['Black Panther', 'Bohemian Rhapsody', 'First Man', 'Roma', 'A Star Is Born']
  },
  {
    name: 'Visual Effects',
    movies: ['Avengers: Infinity War', 'Christopher Robin', 'First Man', 'Ready Player One', 'Solo: A Star Wars Story']
  },
  {
    name: 'Writing (Adapted Screenplay)',
    movies: ['The Ballad of Buster Scruggs', 'BlacKkKlansman', 'Can You Ever Forgive Me?', 'If Beale Street Could Talk', 'A Star Is Born']
  },
  {
    name: 'Writing (Original Screenplay)',
    movies: ['The Favourite', 'First Reformed', 'Green Book', 'Roma', 'Vice']
  }
];

// movies
let movie_list = [
  {
    name: 'Black Panther',
    image: 'images/black-panther.jpg',
    voteCount: 0,
    userSubmitted: false
  },
  {
    name: 'BlacKkKlansman',
    image: 'images/blackkklansman.jpg',
    supportingActor: 'Adam Driver',
    director: 'Spike Lee',
    voteCount: 0,
    userSubmitted: false
  },
  {
    name: 'Bohemian Rhapsody',
    image: 'images/bohemian-rhapsody.jpg',
    actor: 'Rami Malek',
    voteCount: 0,
    userSubmitted: false
  },
  {
    name: 'The Favourite',
    image: 'images/the-favourite.jpg',
    actress: 'Olivia Colman',
    supportingActress: ['Emma Stone', 'Rachel Weisz'],
    director: 'Yorgos Lanthimos',
    voteCount: 0,
    userSubmitted: false
  },
  {
    name: 'Green Book',
    image: 'images/green-book.jpg',
    actor: 'Viggo Mortensen',
    supportingActor: 'Mahershala Ali',
    voteCount: 0,
    userSubmitted: false
  },
  {
    name: 'Roma',
    image: 'images/roma.jpg',
    actress: 'Yalitza Aparicio',
    supportingActress: ['Marina de Tavira'],
    director: 'Alfonso Cuaron',
    voteCount: 0,
    userSubmitted: false
  },
  {
    name: 'A Star Is Born',
    image: 'images/a-star-is-born.jpg',
    actor: 'Bradley Cooper',
    actress: 'Lady Gaga',
    supportingActor: 'Sam Elliott',
    voteCount: 0,
    userSubmitted: false
  },
  {
    name: 'Vice',
    image: 'images/vice.jpg',
    actor: 'Christian Bale',
    supportingActor: 'Sam Rockwell',
    supportingActress: ['Amy Adams'],
    director: 'Adam McKay',
    voteCount: 0,
    userSubmitted: false
  },
  {
    name: "At Eternity's Gate",
    image: 'images/at-eternitys-gate.jpg',
    actor: 'Willem Dafoe',
    voteCount: 0,
    userSubmitted: false
  },
  {
    name: 'The Wife',
    image: 'images/the-wife.jpg',
    actress: 'Glenn Close',
    voteCount: 0,
    userSubmitted: false
  },
  {
    name: 'Can You Ever Forgive Me?',
    image: 'images/can-you-ever-forgive-me.jpg',
    actress: 'Melissa McCarthy',
    supportingActor: 'Richard E. Grant',
    voteCount: 0,
    userSubmitted: false
  },
  {
    name: 'If Beale Street Could Talk',
    image: 'images/if-beale-street-could-talk.jpg',
    supportingActress: ['Regina King'],
    voteCount: 0,
    userSubmitted: false
  },
  {
    name: 'Incredibles 2',
    image: 'images/incredibles-2.jpg',
    voteCount: 0,
    userSubmitted: false
  },
  {
    name: 'Isle of Dogs',
    image: 'images/isle-of-dogs.jpg',
    voteCount: 0,
    userSubmitted: false
  },
  {
    name: 'Mirai',
    image: 'images/mirai.jpg',
    voteCount: 0,
    userSubmitted: false
  },
  {
    name: 'Ralph Breaks the Internet',
    image: 'images/ralph-breaks-the-internet.jpg',
    voteCount: 0,
    userSubmitted: false
  },
  {
    name: 'Spider-Man: Into the Spider-verse',
    image: 'images/spider-man.jpg',
    voteCount: 0,
    userSubmitted: false
  },
  {
    name: 'Cold War',
    image: 'images/cold-war.jpg',
    director: 'Pawel Pawlikowski',
    voteCount: 0,
    userSubmitted: false
  },
  {
    name: 'Never Look Away',
    image: 'images/never-look-away.jpg',
    voteCount: 0,
    userSubmitted: false
  },
  {
    name: 'The Ballad of Buster Scruggs',
    image: 'images/the-ballad-of-buster-scruggs.jpg',
    voteCount: 0,
    userSubmitted: false
  },
  {
    name: 'Mary Poppins Returns',
    image: 'images/mary-poppins-returns.jpg',
    voteCount: 0,
    userSubmitted: false
  },
  {
    name: 'Mary Queen of Scots',
    image: 'images/mary-queen-of-scots.png',
    voteCount: 0,
    userSubmitted: false
  },
  {
    name: 'Free Solo',
    image: 'images/free-solo.jpg',
    voteCount: 0,
    userSubmitted: false

  },
  {
    name: 'Hale County This Morning, This Evening',
    image: 'images/hale-county-this-morning-this-evening.jpg',
    voteCount: 0,
    userSubmitted: false
  },
  {
    name: 'Minding the Gap',
    image: 'images/minding-the-gap.jpg',
    voteCount: 0,
    userSubmitted: false
  },
  {
    name: 'Of Fathers and Sons',
    image: 'images/of-fathers-and-sons.jpg',
    voteCount: 0,
    userSubmitted: false
  },
  {
    name: 'RBG',
    image: 'images/rbg.jpg',
    voteCount: 0,
    userSubmitted: false
  },
  {
    name: 'Black Sheep',
    image: 'images/black-sheep.jpg',
    voteCount: 0,
    userSubmitted: false
  },
  {
    name: 'End Game',
    image: 'images/end-game.jpg',
    voteCount: 0,
    userSubmitted: false
  },
  {
    name: 'Lifeboat',
    image: 'images/lifeboat.jpg',
    voteCount: 0,
    userSubmitted: false
  },
  {
    name: 'A Night at The Garden',
    image: 'images/a-night-at-the-garden.jpeg',
    voteCount: 0,
    userSubmitted: false
  },
  {
    name: 'Period. End of Sentence.',
    image: 'images/period-end-of-sentence.jpg',
    voteCount: 0,
    userSubmitted: false
  },
  {
    name: 'Capernaum',
    image: 'images/capernaum.jpg',
    voteCount: 0,
    userSubmitted: false
  },
  {
    name: 'Shoplifters',
    image: 'images/shoplifters.jpg',
    voteCount: 0,
    userSubmitted: false
  },
  {
    name: 'Border',
    image: 'images/border.jpg',
    voteCount: 0,
    userSubmitted: false
  },
  {
    name: 'First Man',
    image: 'images/first-man.jpg',
    voteCount: 0,
    userSubmitted: false
  },
  {
    name: 'Animal Behaviour',
    image: 'images/animal-behaviour.jpg',
    voteCount: 0,
    userSubmitted: false
  },
  {
    name: 'Bao',
    image: 'images/bao.jpg',
    voteCount: 0,
    userSubmitted: false
  },
  {
    name: 'Late Afternoon',
    image: 'images/late-afternoon.jpg',
    voteCount: 0,
    userSubmitted: false
  },
  {
    name: 'One Small Step',
    image: 'images/one-small-step.jpg',
    voteCount: 0,
    userSubmitted: false
  },
  {
    name: 'Weekends',
    image: 'images/weekends.png',
    voteCount: 0,
    userSubmitted: false
  },
  {
    name: 'Detainment',
    image: 'images/detainment.jpg',
    voteCount: 0,
    userSubmitted: false
  },
  {
    name: 'Fauve',
    image: 'images/fauve.jpg',
    voteCount: 0,
    userSubmitted: false
  },
  {
    name: 'Marguerite',
    image: 'images/marguerite.jpg',
    voteCount: 0,
    userSubmitted: false
  },
  {
    name: 'Mother',
    image: 'images/mother.jpeg',
    voteCount: 0,
    userSubmitted: false
  },
  {
    name: 'Skin',
    image: 'images/skin.jpg',
    voteCount: 0,
    userSubmitted: false
  },
  {
    name: 'A Quiet Place',
    image: 'images/a-quiet-place.jpg',
    voteCount: 0,
    userSubmitted: false
  },
  {
    name: 'Avengers: Infinity War',
    image: 'images/avengers-infinity-war.jpg',
    voteCount: 0,
    userSubmitted: false
  },
  {
    name: 'Christopher Robin',
    image: 'images/christopher-robin.jpg',
    voteCount: 0,
    userSubmitted: false
  },
  {
    name: 'Ready Player One',
    image: 'images/ready-player-one.jpg',
    voteCount: 0,
    userSubmitted: false
  },
  {
    name: 'Solo: A Star Wars Story',
    image: 'images/solo-a-star-wars-story.jpg',
    voteCount: 0,
    userSubmitted: false
  },
  {
    name: 'First Reformed',
    image: 'images/first-reformed.jpg',
    voteCount: 0,
    userSubmitted: false
  },
];

// remove any movies previously in database
db.Movie.deleteMany({}, (err, movies) => {
  if (err) { throw err; };
  console.log('removed all movies');

  // create movies using movie model and seed data above
  db.Movie.create(movie_list, (err, movies) => {
    if (err) { throw err; }
    console.log('recreated all movies');
    console.log(`created ${movies.length} movies`);

    // while creating movies, remove any categories previously in database
    db.Category.deleteMany({}, (err, categories) => {
      if (err) { throw err; };
      console.log('removed all categories');
      // iterate through category list
      category_list.forEach((categoryData) => {
        // create a new category using its model
        let newCategory = new db.Category({
          name: categoryData.name,
        });
        // save the category to the database
        newCategory.save((err, savedCategory) => {
          if (err) {
            console.log(err);
          };
          console.log(savedCategory);
        });

        // put movies in that category
        // get categoryData.movies array
        let moviesInCategory = categoryData.movies;
        console.log(moviesInCategory);
        // iterate through that array
        for (var i = 0; i < moviesInCategory.length; i++) {
          // findOne for each movie in that array
          db.Movie.findOne({ name: moviesInCategory[i] }, (err, foundMovie) => {
            if (err) {
              console.log(err);
              console.log(`couldn't find each movie`);
            };
            console.log(`found movie ${foundMovie.name} for category ${categoryData.name}`);
            // add movie title to movies key in category
            newCategory.movies.push(foundMovie);
            // update created category
            db.Category.findOneAndUpdate({ name: newCategory.name }, newCategory, { new: true }).then((cat) => {
              console.log("HERE IS THE NEW CAT", cat);
            });
          });
        };
      });
    });
  });
});
