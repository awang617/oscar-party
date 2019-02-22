var $moviesList;
var allMovies = [];

$(document).ready(function(){
  // Populate landing page
  // $moviesList = $('#moviesTarget');
  $.ajax({
    method: 'GET',
    url: '/api/category',
    success: handleSuccess,
    error: handleError
  });

});


/////////////////////////////////////////////////
/////////  VOTES PAGE FUNCTIONS  //////////////
/////////////////////////////////////////////////

// iterates through movies array to get name and votecount and add to moviesArr as HTML code
// function getMoviesHtml(movies) {
//   // let moviesArr = [];
//   let labels = [];
//   let data = [];
//   for (let i = 0; i < movies.length; i++) {
//     labels.push(`${movies[i].name}`);
//     data.push(`${movies.voteCount}`)

//   };
//   return moviesArr.join('');
// };

// function getMoviesHtml(movies) {
//   return `<hr>
//           <div id="moviesList">${movies.name} - ${movies.voteCount}</div>`; 
// };


// function getAllMoviesHtml(movies) {
//   return movies.map(getMoviesHtml).join("");
// }

// puts HTML on page
// function render() {
//   $moviesList.empty();

//   let labels = [];
//   let data = [];
//   for (let i = 0; i < movies.length; i++) {
//     .push(`${movies[i].name}`);
//     data.push(`${movies.voteCount}`)

//   };

//   var ctx = document.getElementById("myChart").getContext('2d');
//   var chart = new Chart(ctx, {
//     // The type of chart we want to create
//     type: 'horizontalBar',

//     // The data for our dataset
//     data: {
//         labels: labels,
//         datasets: [{
//             label: "My First dataset",
//             backgroundColor: 'rgb(255, 99, 132)',
//             borderColor: 'rgb(255, 99, 132)',
//             data: data,
//         }]
//     },
//   })
//   // let moviesHtml = getAllMoviesHtml(allMovies);
//   // $moviesList.append(moviesHtml);
// };

function handleSuccess(json) {
  allCategories = json;
  debugger;
  let labels = [];
  let data = [];
  for (let i = 0; i < allCategories[0].movies.length; i++) {
    labels.push(`${allCategories[0].movies[i].name}`);
    data.push(`${allCategories[0].movies[i].voteCount}`)
    
  };
  var ctx = document.getElementById("myChart").getContext('2d');
  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'horizontalBar',

    // The data for our dataset
    data: {
        labels: labels,
        datasets: [{
            label: `${allCategories[0].name}`,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: data,
        }]
    },
  })

  // render();
}

function handleError(e) {
  console.log('uh oh');
  $('#categoryTarget').text('Failed to load categories, is the server working?');
}




