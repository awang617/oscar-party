var $categoriesBallot;
var allCategories = [];
var choices;

$(document).ready(function(){
  
  // Populate ballot page with all nominees
  $categoriesBallot = $('#ballotTarget');
  $.ajax({
    method: 'GET',
    url: '/api/category',
    success: handleSuccess,
    error: handleError
  });

  /*
  // grabs stored choices from landing
  choices = JSON.parse(sessionStorage.getItem('choices'))
  console.log(choices)
  // iterate through each choice
  choices.forEach( movieId => {
    // make movieId a string
    movieId.replace(/['"]+/g, '')
    console.log(movieId)
    // AJAX PUT call to increase vote count of chosen movies
    $.ajax({
      method: "PUT",
      url: `/api/movie/${movieId}`,
      success: addSuccess,
      error: addError
    });
  });
  */
});

// on ballot page, grab the user created movie by key/value pair in sessionStorage
// also on ballot page, we need to add HTML to display the user created movie with edit/delete buttons under the correct category
// highlight user created movie (add class)



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

// puts HTML on the page
function render() {
  $categoriesBallot.empty();
  let categoriesHtml = getAllCategoriesHtml(allCategories);
  $categoriesBallot.append(categoriesHtml);

  // highlight user's choices from landing page
  // let choiceIds = [];
  // selects category names
  let categoryTitles = document.getElementsByClassName("category-title");
  for (var i = 0; i < categoryTitles.length; i++) {
    // making category keys the category names
    let categoryKey = categoryTitles[i].getAttribute('data-target');
    console.log(categoryKey);
    // stores choice IDs into variable
    var chosenId = sessionStorage.getItem(categoryKey);
    // match the category key to the category on the page
    // and grabbing its niece that matches the movie ID
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

////////////////////////////////////////////////////////////////////
///////////////  POPULATE PAGE AJAX FUNCTIONS  /////////////////////
////////////////////////////////////////////////////////////////////

function handleSuccess(json) {
  allCategories = json;
  render();
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

function addSuccess(json) {
  json.voteCount += 1;
  console.log(json.name);
  console.log(json.voteCount);

};

function addError(json) {
  console.log('error')
};




