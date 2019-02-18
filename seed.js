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
        movies: ['Incredibles 2', 'Isle of Dogs', 'Mirai', 'Ralph Breaks the Internet', 'Spiderman: Into the Spider-verse']
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
        name: 'Documentary (Short Subject',
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

    },
    {
        name: 'BlacKkKlansman',
        suppActor: 'Adam Driver',
        director: 'Spike Lee',
    },
    {
        name: 'Bohemian Rhapsody',
        actor: 'Rami Malek',
    },
    {
        name: 'The Favourite',
        actress: 'Olivia Colman',
        // [] QUESTION: LIST AS ARRAY OR TWO SEPARATE PROPERTIES?
        suppActress: ['Emma Stone', 'Rachel Weisz'],
        director: 'Yorgos Lanthimos',
    },
    {
        name: 'Green Book',
        actor: 'Viggo Mortensen',
        suppActor: 'Mahershala Ali',
    },
    {
        name: 'Roma',
        actress: 'Yalitza Aparicio',
        suppActress: 'Marina de Tavira',
        director: 'Alfonso Cuaron',
    },
    {
        name: 'A Star Is Born',
        actor: 'Bradley Cooper',
        actress: 'Lady Gaga',
        suppActor: 'Sam Elliott',
    },
    {
        name: 'Vice',
        actor: 'Christian Bale',
        suppActor: 'Sam Rockwell',
        suppActress: 'Amy Adams',
        director: 'Adam McKay',
    },
    {
        name: "At Eternity's Gate",
        actor: 'Willem Dafoe',
    },
    {
        name: 'The Wife',
        actress: 'Glenn Close',
    },
    {
        name: 'Can You Ever Forgive Me?',
        actress: 'Melissa McCarthy',
        suppActor: 'Richard E. Grant',
    },
    {
        name: 'If Beale Street Could Talk',
        suppActress: 'Regina King',
    },
    {
        name: 'Incredibles 2',
    },
    {
        name: 'Isle of Dogs',
    },
    {
        name: 'Mirai',
    },
    {
        name: 'Ralph Breaks the Internet',
    },
    {
        name: 'Spiderman: Into the Spider-verse',
    },
    {
        name: 'Cold War',
        director: 'Pawel Pawlikowski',
    },
    {
        name: 'Never Look Away',
    },
    {
        name: 'The Ballad of Buster Scruggs',
    },
    {
        name: 'Mary Poppins Returns',
    },
    {
        name: 'Mary Queen of Scots',
    },
    {
        name: 'Free Solo',
    },
    {
        name: 'Hale County This Morning, This Evening',
    },
    {
        name: 'Minding the Gap',
    },
    {
        name: 'Of Fathers and Sons',
    },
    {
        name: 'RBG',
    },
    {
        name: 'Black Sheep',
    },
    {
        name: 'End Game',
    },
    {
        name: 'Lifeboat',
    },
    {
        name: 'A Night at The Garden',
    },
    {
        name: 'Period. End of Sentence.',
    },
    {
        name: 'Capernaum',
    },
    {
        name: 'Shoplifters',
    },
    {
        name: 'Border',
    },
    {
        name: 'First Man',
    },
    {
        name: 'Animal Behaviour',
    },
    {
        name: 'Bao',
    },
    {
        name: 'Late Afternoon',
    },
    {
        name: 'One Small Step',
    },
    {
        name: 'Weekends',
    },
    {
        name: 'Detainment',
    },
    {
        name: 'Fauve',
    },
    {
        name: 'Marguerite',
    },
    {
        name: 'Mother',
    },
    {
        name: 'Skin'
    },
    {
        name: 'A Quiet Place',
    },
    {
        name: 'Avengers: Infinity War',
    },
    {
        name: 'Christopher Robin',
    },
    {
        name: 'Ready Player One',
    },
    {
        name: 'Solo: A Star Wars Story'
    },
    {
        name: 'First Reformed',
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
        category_list.forEach(categoryData) => {
            // create a new category using its model
            let category = new db.Category({
                name: categoryData.name,
            });

            // to populate movies key, find the movies that match
            // [] QUESTION: IS FINDONE THE CORRECT METHOD IF WE'RE APPLYING AN ARRAY?
            // [] QUESTION: DO WE HAVE TO ITERATE THROUGH THE CATEGORY.MOVIES ARRAY BEFORE DOING THIS STEP?
            db.Movie.findOne({ name: categoryData.movies }, (err, foundMovie) => {
                if (err) { throw err; };
                console.log(`found movie ${foundMovie.name} for category ${categoryData.name}`);
                // add movie title to movies key in category
                category.movie = foundMovie;
                // save the category to the database
                category.save((err, savedCategory) => {
                    if (err) { throw err; };
                    console.log(`saved ${savedCategory.name}`);
                });
            });
        };
    });
  });
});