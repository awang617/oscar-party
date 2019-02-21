var $categoriesList;
var allCategories = [];

$(document).ready(function(){

  // Populate landing page
  $categoriesList = $('#categoryTarget');
  $.ajax({
    method: 'GET',
    url: '/api/category',
    success: handleSuccess,
    error: handleError
  });

  // submit button function
  // send to ballot.html page

  // submit button click function
  $('.ballot-form').on('submit', function(e) {
    e.preventDefault();

    // stores choices in a HTMLCollection
    let choices = document.getElementsByClassName("chosen");
    // create an empty array for choice ids
    let choiceIds = [];
    // iterate through choices
    for (var i = 0; i < choices.length; i++) {
      // get choices data-ids and pushes into choiceIds array
      choiceIds.push(choices[i].getAttribute('data-id'));
    }

    // store our choiceIds in sessionStorage
    sessionStorage.setItem('choices', JSON.stringify(choiceIds));

    // change the url to the ballot/html
    if (choiceIds.length < 24) {
      alert('You must choose a movie for each category.')
    } else {
      document.location.href = '/ballot'
    }
    // AJAX function to store choice ids
    // $.ajax({
    //   method: "POST",
    //   url: '',
    //   data: choiceIds,

    //   success: function(response) {
    //     console.log("success!!");
    //   },
    //   error: function() {

    //     console.log("error this is broken");
    //   }
    // });
    // debugger;
    ////////////////
    
    ///Add movie////
    let newMovies = document.getElementsByClassName("userChoice");
    let newMovieNames = [];

    for (i = 0; i < newMovies.length; i++) {
      if (newMovies[i].value !== "") {
        newMovieNames.push({
          name: newMovies[i].value,
          categoryName: newMovies[i].getAttribute('data-category'),
          image: '',
          voteCount: 1
        });
      }
    }

    console.log("newMovieNames", newMovieNames)

    $.ajax({
      method: "POST",
      url: '/api/movie',
      data: { newMovieNames },
      success: function (response) {
        console.log("success!! this is working");
      },
      error: function () {
        console.log("error");
      }
    })


  });

});
    


/////////////////////////////////////////////////
/////////  LANDING PAGE FUNCTIONS  //////////////
/////////////////////////////////////////////////

function getCategoryHtml(category) {
  // removes spaces and () from category name in order to be used as ids
  let categoryNoSpaces = category.name.replace(/[\s()]/g, '');
  // uses Bootstrap classes and ids to create collapsing categories
  return `<div class="accordion" id="accordionExample">
            <hr>
            <button class="btn btn-link" data-toggle="collapse" data-target="#${categoryNoSpaces}">${category.name}</button>
            <div id="${categoryNoSpaces}" class="collapse category" data-parent="#accordionExample">
                ${getMoviesList(category)}
                <input name="userChoice" type="text" data-category="${category.name}" class="userChoice" placeholder="What should have won?">
            </div>
          </div>`;
}

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
}

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
  ////////////////////
};

function handleSuccess(json) {
  allCategories = json;
  render();
}

function handleError(e) {
  console.log('uh oh');
  $('#categoryTarget').text('Failed to load categories, is the server working?');
}



