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

function handleSuccess(json) {
  allMovies = json;

  // set some empty arrays to use for the chart
  let labels = [];
  let data = [];
  
  // filter only the nominated movies
  var nominatedMovies = allMovies.filter(function(item) {
    return item.userSubmitted === false;
  });

  // sort the movies by voteCount in descending order
  nominatedMovies.sort(compare);

  // get the top ten voted for movies
  // push the name and voteCount into the data and label arrays
  for(i=0; i < 10; i++) {
    data.push(nominatedMovies[i].voteCount);
    labels.push(nominatedMovies[i].name);
  };

  // set up the bar graph
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

  // filter all the movies that were user created
  var userChoice = allMovies.filter(function(item) {
    return item.userSubmitted === true;
  });
  console.log(userChoice);

  // append the users' movies to the moviesTarget div
  for (i=0; i<userChoice.length; i++) {
    $('#moviesTarget').append(`<div id="moviesList">${userChoice[i].name}</div>`)
  }

  console.log(data);
  // render();
}

// function to compare values in an object of an array
// found on https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
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




