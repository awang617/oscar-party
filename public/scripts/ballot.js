var choices;

$(document).ready( function() {

    choices = JSON.parse(sessionStorage.getItem('choices'))
    console.log(choices)
    choices.forEach( movieId => {
        movieId.replace(/['"]+/g, '')
        console.log(movieId)
        $.ajax({
            method: "PUT",
            url: `/api/movie/${movieId}`,
            success: addSuccess,
            error: addError
        })
    })
    
})

function addSuccess(json) {
    console.log(json.name);
    json.voteCount++;
    console.log(json.voteCount);

}

function addError(json) {
    console.log('error')
}