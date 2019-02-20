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
});

function getCategoryHtml(category) {
  return `<hr>
          <h3>${category.name}</h3>
          <div class="category">
              ${getMoviesList(category)}
          </div>`;
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
        moviesArr.push(`<div class="nominee">
                          <h4>${category.movies[i].supportingActress} - ${category.movies[i].name}</h4>
                          <img src="${category.movies[i].image}">
                        </div>`);
        break;
      case "Directing":
        moviesArr.push(`<div class="nominee">
                          <h4>${category.movies[i].director} - ${category.movies[i].name}</h4>
                          <img src="${category.movies[i].image}">
                        </div>`);
        break;
      default:
        moviesArr.push(`<div class='nominee'>
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