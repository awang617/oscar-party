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
          <div>
            ${category.name}
          </div>`;
}

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