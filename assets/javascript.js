// My key is:
// GIEFXwdVvg7MqSFdVWZKEy9GYMNrTb9h
// -----------------------------------------
// Ready function wrapping the entire JS
$(document).ready(function () {
    // Array for the teams and hardcode some teams
    let teamArray = ["dolphins", "raiders", "packers", "patriots"];
    let team;

    function setTeam(team) {
        $("#gifs").empty();
        // AJAX Call
        let queryURL = "https://api.giphy.com/v1/gifs/search?api_key=GIEFXwdVvg7MqSFdVWZKEy9GYMNrTb9h&q=" + team + "&limit=10&lang=en";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            for (var i = 0; i < 10; i++) {
                let still = response.data[i].images.fixed_height_still.url;
                let animated = response.data[i].images.fixed_height.url;

                let div = $("<div>");
                let p = $("<p>");
                let image = $("<img>");
                image.addClass("image-class")
                image.attr("src", still);
                image.attr("data-state", "still");
                image.attr("data-animated", animated);
                image.attr("data-still", still);
                div.append(image);
                div.append(p);
                $("#gifs").prepend(div);
            }
        });
    }

    // Function to put the buttons on the page
    function buttonFunction() {

        // First reset the buttons div to empty
        $("#buttons-view").empty();

        // Loop through the teams array
        for (var i = 0; i < teamArray.length; i++) {

            // Then dynamically generates buttons for each movie in the array.
            let button = $("<button>");
            // Adding a class
            button.addClass("team-button btn btn-primary");
            // Adding a data-attribute with a value of the animal at index i
            button.attr("data-type", teamArray[i]);
            // Providing the button's text with a value of the animal at index i
            button.text(teamArray[i]);
            // Adding the button to the HTML
            $("#buttons-view").append(button);
        }

        $(".team-button").on("click", function (event) {
            event.preventDefault();
            team = $(this).text();
            setTeam(team);
        });
    }

    $("#add-team").on("click", function (event) {
        // Preventing the buttons default behavior when clicked (which is submitting a form)
        event.preventDefault();
        // This line grabs the input from the textbox
        var team = $("#team-input").val().trim();
        console.log(team);

        // Adding the movie from the textbox to our array
        teamArray.push(team);


        // Calling showButtons which handles the processing of topics array
        buttonFunction();

        // Now the hard-coded buttons plus whatever was searched will appear as a button
    });

    // When I click on a gif image...
    $(document).on("click", "img", function () {
        var state = $(this).attr("data-state");
        // If the state is in still then change the atrribute to animate
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animated"));
            $(this).attr("data-state", "animate");
        }
        // If the state isn't still, change it to still.
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    buttonFunction();
});