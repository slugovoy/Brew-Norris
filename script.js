$(document).ready(function () {
  const searchButton = $("#search-btn");
  searchButton.on("click", function (e) {
    e.preventDefault();
    var cityName = $("#search").val().trim();
    console.log(cityName);
    buildQueryURL();
    $(".card-content").empty();

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

          $(".results-container").append(
            $("<div>")
              .attr("class", "resultsDiv")
              .append(breweryName, breweryStreet, breweryPhone, breweryWebsite)
          );
        }
      });
    }

    const settings = {
      async: true,
      crossDomain: true,
      url:
        "https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random",
      method: "GET",
      headers: {
        accept: "application/json",
        "x-rapidapi-key": "0649af007dmsh11902b4404b18f5p109e05jsne2a7ef3b2d3f",
        "x-rapidapi-host": "matchilling-chuck-norris-jokes-v1.p.rapidapi.com",
      },
    };
    $.ajax(settings).done(function (response) {
      console.log(response);
      let joke = $("<p>").text(response.value);
      $(".card-content").append(joke);
    });
  });
});
