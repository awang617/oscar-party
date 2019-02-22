var $categoriesBallot;
var allCategories = [];
// selects category names on ballot page
let categoryTitles = document.getElementsByClassName("category-title");
// sets emtpy array to store user created movies ids
let userMovieIds = [];
// empty array to user submitted movies JSON objects after receiving from AJAX call
let userSubmitMovies = [];
// counter variable for user submitted movies render function
let counter = 0;


$(document).ready(function(){

  // Populate ballot page with all nominees
  $categoriesBallot = $('#ballotTarget');
  $.ajax({
    method: 'GET',
    url: '/api/category',
    success: handleSuccess,
    error: handleError
  });


});


/////////////////////////////////////////////////
/////////  BALLOT PAGE FUNCTIONS  //////////////
/////////////////////////////////////////////////
// Sets HTML of category name with nominees
function getCategoryHtml(category) {
  let categoryNoSpaces = category.name.replace(/[\s()]/g, '');
  return `<div class="flex-item">
            <hr>
            <h3 class="category-title " data-target="#${categoryNoSpaces}">${category.name}</h3>
            <div class="category">
              ${getMoviesList(category)}
            </div>
          </div>`;
};

// Sets HTML of nominees
function getMoviesList(category) {
  let moviesArr = [];
  for (let i = 0; i < category.movies.length; i++) {
    switch(category.name) {
      case "Actor in a Leading Role":
        moviesArr.push(`<p class="nominee" data-id="${category.movies[i]._id}">${category.movies[i].actor} - ${category.movies[i].name}</p>`);
        break;
      case "Actress in a Leading Role":
        moviesArr.push(`<p class="nominee" data-id="${category.movies[i]._id}">${category.movies[i].actress} - ${category.movies[i].name}</p>`);
        break;
      case "Actor in a Supporting Role":
        moviesArr.push(`<p class="nominee" data-id="${category.movies[i]._id}">${category.movies[i].supportingActor} - ${category.movies[i].name}</p>`);
        break;
      case "Actress in a Supporting Role":
        if ( category.movies[i].supportingActress.length > 1 ) {
          moviesArr.push(`<p class="nominee" data-id="${category.movies[i]._id}">${category.movies[i].supportingActress[0]} - ${category.movies[i].name}</p>
                          <p class="nominee" data-id="${category.movies[i]._id}">${category.movies[i].supportingActress[1]} - ${category.movies[i].name}</p>`);
        } else {
            moviesArr.push(`<p class="nominee" data-id="${category.movies[i]._id}">${category.movies[i].supportingActress} - ${category.movies[i].name}</p>`);
        }
        break;
      case "Directing":
        moviesArr.push(`<p class="nominee" data-id="${category.movies[i]._id}">${category.movies[i].director} - ${category.movies[i].name}</p>`);
        break;
      default:
        moviesArr.push(`<p class="nominee" data-id="${category.movies[i]._id}">${category.movies[i].name}</p>`);
    };
  };
  return moviesArr.join('');
};

// adds all categories HTML together
function getAllCategoriesHtml(categories) {
  return categories.map(getCategoryHtml).join("");
};

let categoryOfUserSubmitKey = [];

// puts HTML on the page
function render() {
  $categoriesBallot.empty();
  let categoriesHtml = getAllCategoriesHtml(allCategories);
  $categoriesBallot.append(categoriesHtml);

  // highlight user's choices from landing page
  for (var i = 0; i < categoryTitles.length; i++) {
    
    // making category keys the category names
    let categoryKey = categoryTitles[i].getAttribute('data-target');
    // gets category names into variable
    categoryOfUserSubmitKey.push(categoryTitles[i].textContent);

    // getting storage id values and saving into userMovieIds array
    userMovieIds.push(sessionStorage.getItem(categoryOfUserSubmitKey[i]));
    // stores choice IDs into variable
    var chosenId = sessionStorage.getItem(categoryKey);

    // grabbing the category on the page that matches the category key
    // and grabbing its niece movie that matches the movie ID stored in sessionStorage
    var nominatedChoice = $(`[data-target="${categoryKey}"]`).siblings().children(`[data-id="${chosenId}"]`);
    // adding class chosen to all choices
    nominatedChoice.addClass('chosen');
  };
};


/////////////////////////////////////////////////
/////////  USER SUBMITTED FUNCTIONS  ////////////
/////////////////////////////////////////////////

// populates user submitted movies on page
function renderUser(userSubmitMovies) {
  console.log(userSubmitMovies);
  // iterates through names of categories
  for(let i = 0; i < categoryOfUserSubmitKey.length; i++){
    // iterates through JSON object of user submitted movies
    for(let j = 0; j < userSubmitMovies.length; j++){
      // if ID value in session storage matched with category equals the ID in the JSON object
      if(sessionStorage.getItem(categoryOfUserSubmitKey[i]) == userSubmitMovies[j]._id){
        console.log(categoryOfUserSubmitKey[i], userSubmitMovies[j]._id);
        // append name of user submitted movie to category div with edit/delete buttons
        $(`h3:contains(${categoryOfUserSubmitKey[i]})`).siblings('div').append(`<p><span class="user-movie-name">${userSubmitMovies[j].name}</span>
          <button type="button" name="button" class="deleteBtn btn btn-danger pull-right" data-id=${userSubmitMovies[j]._id}>Delete</button>
          <button class="edit-movie-button btn btn-secondary pull-right">Edit</button>
          <span class="edit-input" style="display: none">
            <input type="text" value="${userSubmitMovies[j].name}" />
            <button class="edit-movie-submit-button btn btn-secondary" data-id="${userSubmitMovies[j]._id}">Save</button>
          </span>
          </p>`);
      }
    }
  }

  // deletes user movie from page and from database
  $('.deleteBtn').on('click', function(event) {
    console.log('clicked delete button to', '/api/movie/'+$(this).attr('data-id'));
    $.ajax({
      method: 'DELETE',
      url: '/api/movie/'+$(this).attr('data-id'),
      success: deleteSuccess,
      error: function () {
        console.log(error);
      }
    });
  });

  // shows input form to edit
  $('.edit-movie-button').on('click', function (event) {
    console.log('clicked edit');
    $(this).parent().find('.edit-input').show();
  });

  // click function for save edit button
  $('.edit-movie-submit-button').on('click', function (event) {
    $(this).parent().hide();
    // grabs user form input value
    let newMovieName = $(this).parent().find('input').val();
    // sends AJAX call to update in database and updates name in HTML
    $.ajax({
      method: 'PATCH',
      url: `/api/movie/${ $(this).attr('data-id') }`,
      data: { name: newMovieName },
      success: (response) => {
        $(this).parent().parent().find('.user-movie-name').text(response.name);
      },
      error: function () {
        console.log(error);
      },
    });
  });
};

// delete success for delete button
function deleteSuccess (json) {
  var movie = json;
  movieId = movie._id;
  debugger;
  $(`[data-id="${movie._id}"]`).parent().remove();
};



////////////////////////////////////////////////////////////////////
///////////////  POPULATE PAGE AJAX FUNCTIONS  /////////////////////
////////////////////////////////////////////////////////////////////

// success function upon page load
function handleSuccess(json) {
  allCategories = json;
  render();
  // use user submitted movie IDs to find the movie name in the database
  for (var i = 0; i < userMovieIds.length; i++) {
    // only does AJAX calls for userMovieIds with value, not null, not undefined
    if(userMovieIds[i] && userMovieIds[i]!="undefined"){
      // counter increments upon each AJAX call
      counter++;
      $.ajax({
        method: 'GET',
        url: `/api/movie/${userMovieIds[i]}`,
        // async: false,
        success: getUserMovieSuccess,
        error: function (error) {
          console.log(error);
          console.log("error grabbing user submitted movies");
        },
      });
    };
  };
};

// AJAX success function for finding user submitted movies in database
function getUserMovieSuccess (response) {
  // adds user submitted movies JSON object to array
  userSubmitMovies.push(response);
  // runs renderUser only when it matches counter
  if(userSubmitMovies.length==counter){
    renderUser(userSubmitMovies);
  };
};

function handleError(e) {
  console.log('uh oh');
  $('#categoryTarget').text('Failed to load categories, is the server working?');
};

