$(document).ready(function () {
  const searchButton = $("#search-btn");
  //Making search button
  searchButton.on("click", function (e) {
    e.preventDefault();
    var cityName = $("#search").val().trim();
    if (cityName === "") {
      return;
    }
      //calling first ajax
        buildQueryURL();
        //clearing out all containers
    $(".card-content").empty();
    $(".results-container").empty();
    $(".results-container-header").text("");
    $(".favorites-container-header").text("");
    // creating titles for lists
    $(".results-container-header").append(
      $("<h2>").attr("class", "h2ForHeader").text("List of Breweries")
    );
    $(".favorites-container-header").append(
      $("<h2>").attr("class", "h2ForHeader").text("Favorites")
    );
    $("#search").val("");
    //brewery api function
    function buildQueryURL() {
      var queryURL =
        "https://api.openbrewerydb.org/breweries?by_city=" + cityName;

      $.ajax({
        url: queryURL,
        method: "GET",
      }).then(function (data) {
      // for loop to iterate through the data
        for (let i = 0; i < data.length; i++) {
          //p tag for brewery name
          let breweryName = $("<p>")
            .attr("class", "breweryDataName")
            .attr("id", "breweryName")
            .text("Brewery: " + data[i].name + "," + data[i].city);
          //p tag for brewery address
          let breweryStreet = $("<p>")
            .attr("class", "breweryData")
            .text("Brewery Address: " + data[i].street);
          //p tag for brewery phone number
          let breweryPhone = $("<p>")
            .attr("class", "breweryData")
            .text("Brewery Phone: " + data[i].phone);
          //p tag for active link to brewery website
          let breweryWebsite = $("<p>")
            .text("Brewery website: ")
            .append(
              $("<a>")
                .attr("class", "breweryData")
                .attr("href", data[i].website_url)
                .attr("target", "_blank")
                .text(data[i].website_url)
            );
              //appending all new p tags to results container
          $(".results-container").append(
            $("<div>")
              .attr("class", "resultsDiv")
              .append(breweryName, breweryStreet, breweryPhone, breweryWebsite)
          );
        }
      });
    }
    //second api call for the chuck norris joke
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
      //appending joke to page
      let joke = $("<p>").text(response.value);
      $(".card-content").append(joke);
    });
  });
  // creating function to add name to favorites list
  function saveBrewery(e) {
    let savedBrew = e.target;
    if (e.target.matches(".breweryDataName")) {
      $(".favorites-container").append(
        $("<p>").attr("class", "brewFave").text($(savedBrew).text())
      );
        //saving favorites list to local storage
      breweryHistory.push($(savedBrew).text());
      window.localStorage.setItem(
        "breweryHistory",
        JSON.stringify(breweryHistory)
      );
    }
  }
  $(document).on("click", saveBrewery);
  //pulling local storage items for favorites brewery
  let breweryHistory =
    JSON.parse(window.localStorage.getItem("breweryHistory")) || [];
    if (breweryHistory.length > 0) {
        for (let i = 0; i < breweryHistory.length; i++) {
            $(".favorites-container").append(
                $("<p>").attr("class", "brewFave").text(breweryHistory[i]));

            };
        }
        //ability for user to send a list of favorite breweries via email
        let sendList = $("#sendEmail")
          sendList.on("click", function(e){
              e.preventDefault();
              let text = breweryHistory;
              let textToRead = "";
              for (let i = 0; i < text.length; i++) {
                textToRead = textToRead + "     " + [i] + ". " + text[i];

              }
              let link = "mailto:?subject&body=" + textToRead;
              window.location.href = link;
          })
    });
