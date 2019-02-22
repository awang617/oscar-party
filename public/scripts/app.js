var $categoriesList;
var allCategories = [];
let categoryTitles = document.getElementsByClassName("category-title");

$(document).ready(function(){

  // Populate landing page
  $categoriesList = $('#categoryTarget');
  $.ajax({
    method: 'GET',
    url: '/api/category',
    success: handleSuccess,
    error: handleError
  });

  // submit button click function
  $('.ballot-form').on('submit', function(e) {
    e.preventDefault();

    ///////////////  STORE USER CHOICES ////////////////
    // stores choices in a HTMLCollection
    let choices = document.getElementsByClassName("chosen");
    // create an empty array for choice ids
    let choiceIds = [];
    // iterate through choices
    for (var i = 0; i < choices.length; i++) {
      // get choices data-ids and pushes into choiceIds array
      choiceIds.push(choices[i].getAttribute('data-id'));
    };

    // iterating through category titles again in order to set sessionStorage key to category titles for user submitted movies
    for (var i = 0; i < categoryTitles.length; i++) {
      let categoryKey = categoryTitles[i].getAttribute('data-target');
      // set key to cateogry name in order to store choice movie id with it
      sessionStorage.setItem(categoryKey, choiceIds[i]);
    }; 

    /*
    ///////////////  REDIRECT TO BALLOT  //////////////////
    if (choiceIds.length < 24) {
      alert('You must choose a movie for each category.')
    } else {
      document.location.href = '/ballot'
    } */
    
    /////////////  ADD USER SUBMITTED MOVIE TO DATABASE /////////////
    // grabs userChoice forms
    let newMovies = document.getElementsByClassName("userChoice");
    // set variable for data to send to database through AJAX call
    let newMovieNames = [];
  
    for (i = 0; i < newMovies.length; i++) {
      if (newMovies[i].value !== "") {
        // add new movie objects to array
        newMovieNames.push({
          name: newMovies[i].value,
          // GET RID OF THIS
          // categoryName: newMovies[i].getAttribute('data-category'),
          image: '',
          voteCount: 1,
          userSubmitted: true,
        });
      };
    };
    console.log("newMovieNames", newMovieNames);

    // AJAX call to add movie to database
    for (i=0; i < newMovieNames.length; i++){
      $.ajax({
        method: "POST",
        url: '/api/movie',
        data:  newMovieNames[i],
        success: createSuccess,
        error: function () {
          console.log("error");
        }
      });
    }

    /*
    // iterating through category titles again in order to set sessionStorage key to category titles for user submitted movies
    for (var i = 0; i < categoryTitles.length; i++) {
      let categoryOfUserSubmitKey = categoryTitles[i].textContent;
    // set key to cateogry name in order to know which category user submitted movie is in
      sessionStorage.setItem(categoryOfUserSubmitKey, newMovies[i].value);
      console.log(sessionStorage);
      debugger;
    }; 
    */
  }); 

});
 
let newMovieIds = [];

function createSuccess (response) {
  console.log("success!! this is working");
  console.log(response._id);
  newMovieIds.push(response._id);
  console.log(newMovieIds);

  // iterating through category titles again in order to set sessionStorage key to category titles for user submitted movies
  for (var i = 0; i < categoryTitles.length; i++) {
    let categoryOfUserSubmitKey = categoryTitles[i].textContent;
  // set key to cateogry name in order to know which category user submitted movie is in
    sessionStorage.setItem(categoryOfUserSubmitKey, newMovieIds[i]);
  };
};


/////////////////////////////////////////////////
/////////  LANDING PAGE FUNCTIONS  //////////////
/////////////////////////////////////////////////

function getCategoryHtml(category) {
  // removes spaces and () from category name in order to be used as ids
  let categoryNoSpaces = category.name.replace(/[\s()]/g, '');
  // uses Bootstrap classes and ids to create collapsing categories
  return `<div class="accordion" id="accordionExample">
            <hr>
            <button class="btn btn-link category-title" data-toggle="collapse" data-target="#${categoryNoSpaces}">${category.name}</button>
            <div id="${categoryNoSpaces}" class="collapse category" data-parent="#accordionExample">
                ${getMoviesList(category)}
                <input name="userChoice" type="text" data-category="${category.name}" class="userChoice" placeholder="What should have won?">
            </div>
          </div>`;
};

function getMoviesList(category) {
  let moviesArr = [];
  for (let i = 0; i < category.movies.length; i++) {
    switch(category.name) {
      case "Actor in a Leading Role":
        moviesArr.push(`<div class="nominee" data-id="${category.movies[i]._id}">
                          <h4>${category.movies[i].actor} - ${category.movies[i].name}</h4>
                          <img src="${category.movies[i].image}">
                        </div>`);
        break;
      case "Actress in a Leading Role":
        moviesArr.push(`<div class="nominee" data-id="${category.movies[i]._id}">
                          <h4>${category.movies[i].actress} - ${category.movies[i].name}</h4>
                          <img src="${category.movies[i].image}">
                        </div>`);
        break;
      case "Actor in a Supporting Role":
        moviesArr.push(`<div class="nominee" data-id="${category.movies[i]._id}">
                          <h4>${category.movies[i].supportingActor} - ${category.movies[i].name}</h4>
                          <img src="${category.movies[i].image}">
                        </div>`);
        break;
      case "Actress in a Supporting Role":
        if ( category.movies[i].supportingActress.length > 1 ) {
          moviesArr.push(`<div class="nominee" data-id="${category.movies[i]._id}">
                            <h4>${category.movies[i].supportingActress[0]} - ${category.movies[i].name}</h4>
                            <img src="${category.movies[i].image}">
                          </div>
                          <div class="nominee" data-id="${category.movies[i]._id}">
                            <h4>${category.movies[i].supportingActress[1]} - ${category.movies[i].name}</h4>
                            <img src="${category.movies[i].image}">
                          </div>`);
        } else {
            moviesArr.push(`<div class="nominee" data-id="${category.movies[i]._id}">
                              <h4>${category.movies[i].supportingActress} - ${category.movies[i].name}</h4>
                              <img src="${category.movies[i].image}">
                            </div>`);
        }
        break;
      case "Directing":
        moviesArr.push(`<div class="nominee" data-id="${category.movies[i]._id}">
                          <h4>${category.movies[i].director} - ${category.movies[i].name}</h4>
                          <img src="${category.movies[i].image}">
                        </div>`);
        break;
      default:
        moviesArr.push(`<div class="nominee" data-id="${category.movies[i]._id}">
                          <h4>${category.movies[i].name}</h4>
                          <img src="${category.movies[i].image}">
                        </div>`);
    };
  };
  return moviesArr.join('');
};

function getAllCategoriesHtml(categories) {
  return categories.map(getCategoryHtml).join("");
};

function render() {
  $categoriesList.empty();
  
  let categoriesHtml = getAllCategoriesHtml(allCategories);
  $categoriesList.append(categoriesHtml);
  // add event listeners
  $('.nominee').on('click', function(event) {
    event.preventDefault();
    // so that only one element is "chosen"
    $(this).siblings().removeClass(' chosen');
    $(this).toggleClass(' chosen');
  });
};

function handleSuccess(json) {
  allCategories = json;
  render();
};

function handleError(e) {
  console.log('uh oh');
  $('#categoryTarget').text('Failed to load categories, is the server working?');
};



