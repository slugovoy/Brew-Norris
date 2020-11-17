$(document).ready(function () {
  const searchButton = $("#search-btn");
  searchButton.on("click", function (e) {
    e.preventDefault();
    var cityName = $("#search").val().trim();
    console.log(cityName);
    buildQueryURL();

    function buildQueryURL() {
      var queryURL =
        "https://api.openbrewerydb.org/breweries?by_city=" + cityName;
     
      $.ajax({
        url: queryURL,
        method: "GET",
      }).then(function (data) {
        
        for (let i = 0; i < data.length; i++) {
          let breweryName = $("<p>")
            .attr("class", "breweryData")
            .text("Brewery: " + data[i].name);
          console.log(data[i].name);
          let breweryStreet = $("<p>")
            .attr("class", "breweryData")
            .text("Brewery Address: " + data[i].street);

            let breweryPhone = $("<p>")
            .attr("class", "breweryData")
            .text("Brewery Phone: " + data[i].phone);

            let breweryWebsite = $("<p>")
            .attr("class", "breweryData")
            .text("Brewery Website: " + data[i].website_url);


          $(".results-container").append(breweryName, breweryStreet, breweryPhone, breweryWebsite);
        }
      });
    }
  });
});
