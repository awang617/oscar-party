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
  
  $('ul').on('click', 'li',  function() {
    console.log($(this))
    
    // alert(`${$(this)} clicked`)
  })
});
    

function getCategoryHtml(category) {
  $('#catName').append(`<hr><h3 class="trigger-toggle">${category.name}</h3>`)
  let moviesList = getMoviesList(category);
  // let temp = moviesList.forEach(movie=>{
  //   console.log(movie);
  //   $('ul').append(`<li id=${movie._id}>` + movie + '</li>');
  // });
  console.log(temp);
  // return `<hr>
  //         <h3 class="trigger-toggle">${category.name}</h3>
  //         ${temp}`;
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
      $('ul').append(`<li id=${category.movies[i]._id}>` + `
                        <h4>${category.movies[i].name}</h4>
                        <img src="${category.movies[i].image}">` + '</li>');
        // moviesArr.push(`
        //                   <h4>${category.movies[i].name}</h4>
        //                   <img src="${category.movies[i].image}">
                          
        //                 `);
        // moviesArr.push(`<img src='${category.movies[i].image}'>`)
    };
  };
  console.log(moviesArr);
  return moviesArr;
  // return moviesArr.join('');
};

function getAllCategoriesHtml(categories) {
  console.log();
  return getCategoryHtml(categories[0]);
  // return categories.map(getCategoryHtml).join("");
}

function render() {
  // $categoriesList.empty();
  // getMoviesList().forEach(movie=> {
  //   $categoriesList.append(movie)
  // })
  
  let categoriesHtml = getAllCategoriesHtml(allCategories);
  $categoriesList.append(categoriesHtml);

  // $('.category').first().removeClass('hidden');

  // $(".trigger-toggle").on('click', function() {
  //   $('.category:not(.hidden)').addClass('hidden');
    
  //   $(this).siblings('.category').toggleClass('hidden');
  // })
}

function handleSuccess(json) {
  allCategories = json;
  render();
}

function handleError(e) {
  console.log('uh oh');
  $('#categoryTarget').text('Failed to load categories, is the server working?');
}