var $categoriesList;
var allCategories = [];

$(document).ready(function(){

  console.log('AHHHHAHAHAHAHAHAHAHHHHH');
  $categoriesList = $('#categoryTarget');
  $.ajax({
    method: 'GET',
    url: '/api/category',
    success: handleSuccess,
    error: handleError
  });
});

function getCategoryHtml(category) {
  console.log('AHHHHAHAHAHAHAHAHAHHHHH');
  return `<hr>
          <div>
            ${category.name}
          </div>`;
}
//try foundCategories instead?

function getAllCategoriesHtml(categories) {
  console.log('AHHHHAHAHAHAHAHAHAHHHHH');
  return categories.map(getCategoryHtml).join("");
}

function render() {
  console.log('AHHHHAHAHAHAHAHAHAHHHHH');
  $categoriesList.empty();
  let categoriesHtml = getAllCategoriesHtml(allCategories);
  $categoriesList.append(categoriesHtml);
}

function handleSuccess(json) {
  console.log('AHHHHAHAHAHAHAHAHAHHHHH');
  allCategories = json;
  render();
}

// const handleSuccess = json => {
//   for (let i = 0; i < json.length; i++) {
//     let category = json[i].name;
//     let movies = json[i].movies;
//     $("#categoryTarget").append(category);
//     // $("#movieTarget").append(movies);
//   }
// };

function handleError(e) {
  console.log('uh oh');
  $('#categoryTarget').text('Failed to load categories, is the server working?');
}