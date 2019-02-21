var $categoriesList;
var allCategories = [];

$(document).ready(function(){
  
  // Populate ballot page with all nominees
  $categoriesBallot = $('#ballotTarget');
  $.ajax({
    method: 'GET',
    url: '/api/category',
    success: handleSuccess,
    error: handleError
  });

  // see what others voted for button
  // should redirect to vote count page
  // does it need to ajax call?
  // or could it just be an <a>?

});


/////////////////////////////////////////////////
/////////  BALLOT PAGE FUNCTIONS  //////////////
/////////////////////////////////////////////////

function getCategoryHtml(category) {
  return `<div>
            <hr>
            <h3>${category.name}</h3>
            <div class="category">
              ${getMoviesList(category)}
            </div>
          </div>`;
}

function getMoviesList(category) {
  let moviesArr = [];
  for (let i = 0; i < category.movies.length; i++) {
    switch(category.name) {
      case "Actor in a Leading Role":
        moviesArr.push(`<h4 class="nominee">${category.movies[i].actor} - ${category.movies[i].name}</h4>`);
        break;
      case "Actress in a Leading Role":
        moviesArr.push(`<h4 class="nominee">${category.movies[i].actress} - ${category.movies[i].name}</h4>`);
        break;
      case "Actor in a Supporting Role":
        moviesArr.push(`<h4 class="nominee">${category.movies[i].supportingActor} - ${category.movies[i].name}</h4>`);
        break;
      case "Actress in a Supporting Role":
        if ( category.movies[i].supportingActress.length > 1 ) {
          moviesArr.push(`<h4 class="nominee">${category.movies[i].supportingActress[0]} - ${category.movies[i].name}</h4>
                            <h4 class="nominee">${category.movies[i].supportingActress[1]} - ${category.movies[i].name}</h4>`);
        } else {
            moviesArr.push(`<h4 class="nominee">${category.movies[i].supportingActress} - ${category.movies[i].name}</h4>`);
        }
        break;
      case "Directing":
        moviesArr.push(`<h4 class="nominee">${category.movies[i].director} - ${category.movies[i].name}</h4>`);
        break;
      default:
        moviesArr.push(`<h4 class="nominee">${category.movies[i].name}</h4>`);
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
};

function handleSuccess(json) {
  allCategories = json;
  render();
}

function handleError(e) {
  console.log('uh oh');
  $('#categoryTarget').text('Failed to load categories, is the server working?');
}



