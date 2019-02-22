var $moviesList;
var allMovies = [];

$(document).ready(function(){
  // Populate landing page
  // $moviesList = $('#moviesTarget');
  $.ajax({
    method: 'GET',
    url: '/api/movie',
    success: handleSuccess,
    error: handleError
  });

  $('#new-ballot').click(function(e) {
    document.location.href = '/'
  })

  $('#my-ballot').click(function(e) {
    document.location.href = '/ballot'
  })
});


/////////////////////////////////////////////////
/////////  VOTES PAGE FUNCTIONS  //////////////
/////////////////////////////////////////////////

// iterates through movies array to get name and votecount and add to moviesArr as HTML code
// function getMoviesHtml(movies) {
//   // let moviesArr = [];
//   for (let i = 0; i < movies.length; i++) {
//     moviesArr.push(`${movies[i].name}`);
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
//   let moviesHtml = getAllMoviesHtml(allMovies);
//   $moviesList.append(moviesHtml);
// };

function handleSuccess(json) {
  allMovies = json;
  let labels = [];
  let data = [];
  
  allMovies.sort(compare);

  // get the top ten voted for movies
  for(i=0; i < 10; i++) {
    data.push(allMovies[i].voteCount);
    labels.push(allMovies[i].name);
  };

  var ctx = document.getElementById("myChart").getContext('2d');
  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'horizontalBar',

    // The data for our dataset
    data: {
        labels: labels,
        datasets: [{
            label: 'Top Voted On Movies',
            backgroundColor: '#B49B57',
            borderColor: '#B49B57',
            data: data,
        }]
    },
  })
  var userChoice = allMovies.filter(function(item) {
    return item.userSubmitted === true;
  });
  console.log(userChoice);

  for (i=0; i<userChoice.length; i++) {
    $('#moviesTarget').append(`<div id="moviesList">${userChoice[i].name}</div>`)
  }

  console.log(data);
  // render();
}

function compare(a,b) {
  if (a.voteCount > b.voteCount){
    return -1;
  }if (a.voteCount < b.voteCount){
    return 1;
  } return 0;
}

function handleError(e) {
  console.log('uh oh');
  $('#categoryTarget').text('Failed to load categories, is the server working?');
}




