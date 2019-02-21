var $categoriesList;
var allCategories = [];

$(document).ready(function(){
  $categoriesList = $('#categoryTarget');
  $.ajax({
    method: 'GET',
    url: '/api/category',
    success: handleSuccess,
    error: handleError
  });

  $categoriesList.on('click', '.nominee', (clickAlert) => {
    console.log($(this))
    alert(`${$(this)} clicked`)
  })
});

///////////////////
//INDEX FUNCTIONS//
///////////////////

function getCategoryHtml(category) {
  // removes spaces and () from category name in order to be used as ids
  let categoryNoSpaces = category.name.replace(/[\s()]/g, '');
  // uses Bootstrap classes and ids to create collapsing categories
  return `<div class="accordion" id="accordionExample">
            <hr>
            <button class="btn btn-link" data-toggle="collapse" data-target="#${categoryNoSpaces}">${category.name}</button>
            <div id="${categoryNoSpaces}" class="collapse category" data-parent="#accordionExample">
                ${getMoviesList(category)}
                <input type="text" placeholder="What should have won?">
            </div>
          </div>`;
          // need to somehow give distinct names to each category's id in order for the collapse to work on one category at a time.
}

function getMoviesList(category) {
  let moviesArr = [];
  for (let i = 0; i < category.movies.length; i++) {
    switch(category.name) {
      case "Actor in a Leading Role":
        moviesArr.push(`<div class="nominee">
                          <h4>${category.movies[i].actor} - ${category.movies[i].name}</h4>
                          <img src="${category.movies[i].image}">
                        </div>`);
        break;
      case "Actress in a Leading Role":
        moviesArr.push(`<div class="nominee">
                          <h4>${category.movies[i].actress} - ${category.movies[i].name}</h4>
                          <img src="${category.movies[i].image}">
                        </div>`);
        break;
      case "Actor in a Supporting Role":
        moviesArr.push(`<div class="nominee">
                          <h4>${category.movies[i].supportingActor} - ${category.movies[i].name}</h4>
                          <img src="${category.movies[i].image}">
                        </div>`);
        break;
      case "Actress in a Supporting Role":
        if ( category.movies[i].supportingActress.length > 1 ) {
          moviesArr.push(`<div class="nominee">
                            <h4>${category.movies[i].supportingActress[0]} - ${category.movies[i].name}</h4>
                            <img src="${category.movies[i].image}">
                          </div>
                          <div class="nominee">
                            <h4>${category.movies[i].supportingActress[1]} - ${category.movies[i].name}</h4>
                            <img src="${category.movies[i].image}">
                          </div>`);
        } else {
            moviesArr.push(`<div class="nominee">
                              <h4>${category.movies[i].supportingActress} - ${category.movies[i].name}</h4>
                              <img src="${category.movies[i].image}">
                            </div>`);
        }
        break;
      case "Directing":
        moviesArr.push(`<div class="nominee">
                          <h4>${category.movies[i].director} - ${category.movies[i].name}</h4>
                          <img src="${category.movies[i].image}">
                        </div>`);
        break;
      default:
        moviesArr.push(`<div class="nominee">
                          <h4>${category.movies[i].name}</h4>
                          <img src="${category.movies[i].image}">
                        </div>`);
        // moviesArr.push(`<img src='${category.movies[i].image}'>`)
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
}

function handleSuccess(json) {
  allCategories = json;
  render();
}

function handleError(e) {
  console.log('uh oh');
  $('#categoryTarget').text('Failed to load categories, is the server working?');
}

////////////////////
//BALLOT FUNCTIONS//
////////////////////