$(document).ready(function () {
  const searchButton = $("#search-btn");
  searchButton.on("click", function (e) {
    e.preventDefault();
    var cityName = $("#search").val().trim();
        buildQueryURL();
    $(".card-content").empty();
    $(".results-container").empty();
    $(".results-container-header").text("");
    $(".favorites-container-header").text("");
    $(".results-container-header").append(
      $("<h2>").attr("class", "h2ForHeader").text("List of Breweries")
    );
    $(".favorites-container-header").append(
      $("<h2>").attr("class", "h2ForHeader").text("Favorites")
    );
    $("#search").val("");
    function buildQueryURL() {
      var queryURL =
        "https://api.openbrewerydb.org/breweries?by_city=" + cityName;

      $.ajax({
        url: queryURL,
        method: "GET",
      }).then(function (data) {
          console.log(data);
        for (let i = 0; i < data.length; i++) {
          let breweryName = $("<p>")
            .attr("class", "breweryDataName")
            .attr("id", "breweryName")
            .text("Brewery: " + data[i].name + "," + data[i].city);
        
          let breweryStreet = $("<p>")
            .attr("class", "breweryData")
            .text("Brewery Address: " + data[i].street);

          let breweryPhone = $("<p>")
            .attr("class", "breweryData")
            .text("Brewery Phone: " + data[i].phone);

          let breweryWebsite = $("<p>")
            .text("Brewery website: ")
            .append(
              $("<a>")
                .attr("class", "breweryData")
                .attr("href", data[i].website_url)
                .attr("target", "_blank")
                .text(data[i].website_url)
            );

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
  function saveBrewery(e) {
    let savedBrew = e.target;
    if (e.target.matches(".breweryDataName")) {
      $(".favorites-container").append(
        $("<p>").attr("class", "brewFave").text($(savedBrew).text())
      );

      breweryHistory.push($(savedBrew).text());
      window.localStorage.setItem(
        "breweryHistory",
        JSON.stringify(breweryHistory)
      );
    }
  }
  $(document).on("click", saveBrewery);

  let breweryHistory =
    JSON.parse(window.localStorage.getItem("breweryHistory")) || [];
    if (breweryHistory.length > 0) {
        for (let i = 0; i < breweryHistory.length; i++) {
            $(".favorites-container").append(
                $("<p>").attr("class", "brewFave").text(breweryHistory[i]));   
      
            };
        }

  
});
