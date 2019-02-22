var $categoriesBallot;
var allCategories = [];
// selects category names on ballot page
let categoryTitles = document.getElementsByClassName("category-title");
// sets emtpy array to store user created movies ids
let userMovieIds = [];
// empty array to user submitted movies JSON objects after receiving from AJAX call
let userSubmitMovies = [];
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
        moviesArr.push(`<h4 class="nominee" data-id="${category.movies[i]._id}">${category.movies[i].actor} - ${category.movies[i].name}</h4>`);
        break;
      case "Actress in a Leading Role":
        moviesArr.push(`<h4 class="nominee" data-id="${category.movies[i]._id}">${category.movies[i].actress} - ${category.movies[i].name}</h4>`);
        break;
      case "Actor in a Supporting Role":
        moviesArr.push(`<h4 class="nominee" data-id="${category.movies[i]._id}">${category.movies[i].supportingActor} - ${category.movies[i].name}</h4>`);
        break;
      case "Actress in a Supporting Role":
        if ( category.movies[i].supportingActress.length > 1 ) {
          moviesArr.push(`<h4 class="nominee" data-id="${category.movies[i]._id}">${category.movies[i].supportingActress[0]} - ${category.movies[i].name}</h4>
                          <h4 class="nominee" data-id="${category.movies[i]._id}">${category.movies[i].supportingActress[1]} - ${category.movies[i].name}</h4>`);
        } else {
            moviesArr.push(`<h4 class="nominee" data-id="${category.movies[i]._id}">${category.movies[i].supportingActress} - ${category.movies[i].name}</h4>`);
        }
        break;
      case "Directing":
        moviesArr.push(`<h4 class="nominee" data-id="${category.movies[i]._id}">${category.movies[i].director} - ${category.movies[i].name}</h4>`);
        break;
      default:
        moviesArr.push(`<h4 class="nominee" data-id="${category.movies[i]._id}">${category.movies[i].name}</h4>`);
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

    categoryOfUserSubmitKey.push(categoryTitles[i].textContent);
    // console.log(i, categoryOfUserSubmitKey);
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

  // add event listeners if user wants to change choice
  $('.nominee').on('click', function(event) {
    event.preventDefault();
    // so that only one element is "chosen"
    $(this).siblings().removeClass(' chosen');
    $(this).toggleClass(' chosen');
  });
};


/////////////////////////////////////////////////
/////////  USER SUBMITTED FUNCTIONS  ////////////
/////////////////////////////////////////////////

// ERROR ===============================================
// =====================================================
// =====================================================
function renderUser(userSubmitMovies) {
  console.log(userSubmitMovies);
  for(let i=0; i<categoryOfUserSubmitKey.length;i++){
    for(let j=0; j<userSubmitMovies.length;j++){
      if(sessionStorage.getItem(categoryOfUserSubmitKey[i]) == userSubmitMovies[j]._id){
        console.log(categoryOfUserSubmitKey[i], userSubmitMovies[j]._id);
        $(`h3:contains(${categoryOfUserSubmitKey[i]})`).siblings('div').append(`<p>${userSubmitMovies[j].name}</p>`);
      }
    }
  }
};

////////////////////////////////////////////////////////////////////
///////////////  POPULATE PAGE AJAX FUNCTIONS  /////////////////////
////////////////////////////////////////////////////////////////////


function handleSuccess(json) {
  allCategories = json;
  render();
  // use user submitted movie IDs to find the movie name in the database
  //  console.log(userMovieIds);
  for (var i = 0; i < userMovieIds.length; i++) {
    if(userMovieIds[i] && userMovieIds[i]!="undefined"){
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

function getUserMovieSuccess (response) {
  // console.log("success!");
  userSubmitMovies.push(response);
  // console.log(userSubmitMovies);
  console.log(userSubmitMovies.length,counter);
  if(userSubmitMovies.length==counter){
    renderUser(userSubmitMovies);
  }
  // renderUser(userSubmitMovies);
};




function handleError(e) {
  console.log('uh oh');
  $('#categoryTarget').text('Failed to load categories, is the server working?');
};


////////////////////////////////////////////////////////////////////
//////////  MATCH CHOICES FROM LANDING TO BALLOT PAGE  /////////////
////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////
//////////////  ADDING VOTE COUNT AJAX FUNCTIONS ///////////////////
////////////////////////////////////////////////////////////////////




