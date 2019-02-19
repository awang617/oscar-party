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
      // [] QUESTION: DO I NEED TO POPULATE 'THE FAVOURITE' TWICE FOR ITS TWO NOMINEES?
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
    image: './public/images/black-panther.jpg',
    voteCount: 0,
  },
  {
    name: 'BlacKkKlansman',
    image: './public/images/blackkklansman.jpg',
    supportingActor: 'Adam Driver',
    director: 'Spike Lee',
    voteCount: 0,
  },
  {
    name: 'Bohemian Rhapsody',
    image: './public/images/bohemian-rhapsody.jpg',
    actor: 'Rami Malek',
    voteCount: 0,
  },
  {
    name: 'The Favourite',
    image: './public/images/the-favourite.jpg',
    actress: 'Olivia Colman',
    // [] QUESTION: LIST AS ARRAY OR TWO SEPARATE PROPERTIES?
    supportingActress: ['Emma Stone', 'Rachel Weisz'],
    director: 'Yorgos Lanthimos',
    voteCount: 0,
  },
  {
    name: 'Green Book',
    image: './public/images/green-book.jpg',
    actor: 'Viggo Mortensen',
    supportingActor: 'Mahershala Ali',
    voteCount: 0,
  },
  {
    name: 'Roma',
    image: './public/images/roma.jpg',
    actress: 'Yalitza Aparicio',
    supportingActress: ['Marina de Tavira'],
    director: 'Alfonso Cuaron',
    voteCount: 0,
  },
  {
    name: 'A Star Is Born',
    image: './public/images/a-star-is-born.jpg',
    actor: 'Bradley Cooper',
    actress: 'Lady Gaga',
    supportingActor: 'Sam Elliott',
    voteCount: 0,
  },
  {
    name: 'Vice',
    image: './public/images/vice.jpg',
    actor: 'Christian Bale',
    supportingActor: 'Sam Rockwell',
    supportingActress: ['Amy Adams'],
    director: 'Adam McKay',
    voteCount: 0,
  },
  {
    name: "At Eternity's Gate",
    image: './public/images/at-eternitys-gate.jpg',
    actor: 'Willem Dafoe',
    voteCount: 0,
  },
  {
    name: 'The Wife',
    image: './public/images/the-wife.jpg',
    actress: 'Glenn Close',
    voteCount: 0,
  },
  {
    name: 'Can You Ever Forgive Me?',
    image: './public/images/can-you-ever-forgive-me.jpg',
    actress: 'Melissa McCarthy',
    supportingActor: 'Richard E. Grant',
    voteCount: 0,
  },
  {
    name: 'If Beale Street Could Talk',
    image: './public/images/if-beale-street-could-talk.jpg',
    supportingActress: ['Regina King'],
    voteCount: 0,
  },
  {
    name: 'Incredibles 2',
    image: './public/images/incredibles-2.jpg',
    voteCount: 0,
  },
  {
    name: 'Isle of Dogs',
    image: './public/images/isle-of-dogs.jpg',
    voteCount: 0,
  },
  {
    name: 'Mirai',
    image: './public/images/mirai.jpg',
    voteCount: 0,
  },
  {
    name: 'Ralph Breaks the Internet',
    image: './public/images/ralph-breaks-the-internet.jpg',
    voteCount: 0,
  },
  {
    name: 'Spider-Man: Into the Spider-verse',
    image: './public/images/spider-man.jpg',
    voteCount: 0,
  },
  {
    name: 'Cold War',
    image: './public/images/cold-war.jpg',
    director: 'Pawel Pawlikowski',
    voteCount: 0,
  },
  {
    name: 'Never Look Away',
    image: './public/images/never-look-away.jpg',
    voteCount: 0,
  },
  {
    name: 'The Ballad of Buster Scruggs',
    image: './public/images/the-ballad-of-buster-scruggs.jpg',
    voteCount: 0,
  },
  {
    name: 'Mary Poppins Returns',
    image: './public/images/mary-poppins-returns.jpg',
    voteCount: 0,
  },
  {
    name: 'Mary Queen of Scots',
    image: './public/images/mary-queen-of-scots.png',
    voteCount: 0,
  },
  {
    name: 'Free Solo',
    image: './public/images/free-solo.jpg',
    voteCount: 0,
  },
  {
    name: 'Hale County This Morning, This Evening',
    image: './public/images/hale-county-this-morning-this-evening.jpg',
    voteCount: 0,
  },
  {
    name: 'Minding the Gap',
    image: './public/images/minding-the-gap.jpg',
    voteCount: 0,
  },
  {
    name: 'Of Fathers and Sons',
    image: './public/images/of-fathers-and-sons.jpg',
    voteCount: 0,
  },
  {
    name: 'RBG',
    image: './public/images/rbg.jpg',
    voteCount: 0,
  },
  {
    name: 'Black Sheep',
    image: './public/images/black-sheep.jpg',
    voteCount: 0,
  },
  {
    name: 'End Game',
    image: './public/images/end-game.jpg',
    voteCount: 0,
  },
  {
    name: 'Lifeboat',
    image: './public/images/lifeboat.jpg',
    voteCount: 0,
  },
  {
    name: 'A Night at The Garden',
    image: './public/images/a-night-at-the-garden.jpeg',
    voteCount: 0,
  },
  {
    name: 'Period. End of Sentence.',
    image: './public/images/period-end-of-sentence.jpg',
    voteCount: 0,
  },
  {
    name: 'Capernaum',
    image: './public/images/capernaum.jpg',
    voteCount: 0,
  },
  {
    name: 'Shoplifters',
    image: './public/images/shoplifters.jpg',
    voteCount: 0,
  },
  {
    name: 'Border',
    image: './public/images/border.jpg',
    voteCount: 0,
  },
  {
    name: 'First Man',
    image: './public/images/first-man.jpg',
    voteCount: 0,
  },
  {
    name: 'Animal Behaviour',
    image: './public/images/animal-behaviour.jpg',
    voteCount: 0,
  },
  {
    name: 'Bao',
    image: './public/images/bao.jpg',
    voteCount: 0,
  },
  {
    name: 'Late Afternoon',
    image: './public/images/late-afternoon.jpg',
    voteCount: 0,
  },
  {
    name: 'One Small Step',
    image: './public/images/one-small-step.jpg',
    voteCount: 0,
  },
  {
    name: 'Weekends',
    image: './public/images/weekends.png',
    voteCount: 0,
  },
  {
    name: 'Detainment',
    image: './public/images/detainment.jpg',
    voteCount: 0,
  },
  {
    name: 'Fauve',
    image: './public/images/fauve.jpg',
    voteCount: 0,
  },
  {
    name: 'Marguerite',
    image: './public/images/marguerite.jpg',
    voteCount: 0,
  },
  {
    name: 'Mother',
    image: './public/images/mother.jpeg',
    voteCount: 0,
  },
  {
    name: 'Skin',
    image: './public/images/skin.jpg',
    voteCount: 0,
  },
  {
    name: 'A Quiet Place',
    image: './public/images/a-quiet-place.jpg',
    voteCount: 0,
  },
  {
    name: 'Avengers: Infinity War',
    image: './public/images/avengers-infinity-war.jpg',
    voteCount: 0,
  },
  {
    name: 'Christopher Robin',
    image: './public/images/christopher-robin.jpg',
    voteCount: 0,
  },
  {
    name: 'Ready Player One',
    image: './public/images/ready-player-one.jpg',
    voteCount: 0,
  },
  {
    name: 'Solo: A Star Wars Story',
    image: './public/images/solo-a-star-wars-story.jpg',
    voteCount: 0,
  },
  {
    name: 'First Reformed',
    image: './public/images/first-reformed.jpg',
    voteCount: 0,
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
          console.log(`saved ${savedCategory.name}`);
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
            db.Category.findOneAndUpdate({ name: newCategory.name }, newCategory, { new:true }).then((cat) => {
              console.log("HERE IS THE NEW CAT",cat);
            });
          });
        };
      });
    });
  });
});