var $moviesList;
var allMovies = [];

$(document).ready(function(){
  // Populate landing page
  $moviesList = $('#moviesTarget');
  $.ajax({
    method: 'GET',
    url: '/api/movie',
    success: handleSuccess,
    error: handleError
  });
});


/////////////////////////////////////////////////
/////////  VOTES PAGE FUNCTIONS  //////////////
/////////////////////////////////////////////////

// iterates through movies array to get name and votecount and add to moviesArr as HTML code
// function getMoviesHtml(movies) {
//   let moviesArr = [];
//   for (let i = 0; i < movies.length; i++) {
//   moviesArr.push(`<h4>${movies[i].name} - ${movies[i].voteCount}</h4>`);
//   };
//   return moviesArr.join('');
// };

function getMoviesHtml(movies) {
  return `<hr>
          <div id="moviesList">${movies.name} - ${movies.voteCount}</div>
          `;
};

//
function getAllMoviesHtml(movies) {
  return movies.map(getMoviesHtml).join("");
}

// puts HTML on page
function render() {
  $moviesList.empty();
  let moviesHtml = getAllMoviesHtml(allMovies);
  $moviesList.append(moviesHtml);
};

function handleSuccess(json) {
  allMovies = json;
  render();
}

function handleError(e) {
  console.log('uh oh');
  $('#categoryTarget').text('Failed to load categories, is the server working?');
}



