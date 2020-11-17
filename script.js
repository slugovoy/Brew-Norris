const searchButton = $('#search-btn');
let cityName = $('#search').val().trim();
searchButton.on('click', function(e){
    e.preventDefault();
    console.log('hi guys');
    buildQueryURL();
});

function buildQueryURL() {
    var queryURL = "https://api.openbrewerydb.org/breweries?by_city=" + cityName;
    // $.ajax({
        // url: queryURL,
        // method: "GET"
    // })
    console.log(queryURL);
}
