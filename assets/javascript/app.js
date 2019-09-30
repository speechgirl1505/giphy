$(document).ready(function () {

    var favOfficeCharacters = ["Creed Bratton", "Dwight Schrute", "Michael Scott", "Jim Halpert", "Andy Bernard", "Pam Beesly", "Stanley Hudson", "Kevin Malone", "Kelly Kapoor", "Ryan Howard", "Oscar Martinez", "Angela Martin", "Toby Flenderson", "Meredith Palmer", "Phyllis Vance"]

    function gifButtons() {

        $("#character-buttons").empty();
        //for loop to create buttons for each character named in our var and adding class, text, and data. 
        for (var i = 0; i < favOfficeCharacters.length; i++) {
            var BUTTon = $("<button>");
            BUTTon.addClass("office-person");
            BUTTon.attr("data-person", favOfficeCharacters[i]);
            BUTTon.text(favOfficeCharacters[i]);
            //attaching each BUTTon to our div created in html
            $("#character-buttons").append(BUTTon);

        }

    }

    $("#add-staff").on("click", function(){
       event.preventDefault();
        var newStaff = $("#addingStaff").val();

        favOfficeCharacters.push(newStaff);

        gifButtons(favOfficeCharacters, "#character-buttons", ".office-person");
    
    })

            $(document).on("click", ".office-person", function () {
                //emptying out the div we hardcoded in our html
                $("#characters").empty();

                var character = $(this).attr("data-person");
                var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=GQPE58xAKTEmjioK6KTsoHPtIPfjbRQt&q=" + character +"&limit=10&rating=PG-13&lang=en";

                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function (whatchaGot) {
                    console.log(whatchaGot);
                    var giveItToMe = whatchaGot.data;

                    for (var i = 0; i < giveItToMe.length; i++) {
                        //making a var and creating the div that will hold our gifs
                        var craziesDiv = $("<div class='characters-gohere'>");
                        //making the var that will hold the ratings we get back
                        var rating = giveItToMe[i].rating;
                        //making a var and creating the p that will display our ratings as ratings
                        var rateMe = $("<p>").text("Rating: " + rating);
                        //making vars to hold info for our gifs while playing and stopped
                        var still = giveItToMe[i].images.fixed_height_still.url;
                        var animated = giveItToMe[i].images.fixed_height.url;
                        //making a var and creating an image element, then assigning class and attributes
                        var characterImg = $("<img>");
                        characterImg.attr("src", still);
                        characterImg.attr("data-still", still);
                        characterImg.attr("data-animate", animated);
                        characterImg.attr("data-state", "still");
                        characterImg.addClass("character-img");
                        //attaching our rating and gifs into the div we created for them
                        craziesDiv.append(characterImg);
                        craziesDiv.append(rateMe);
                        //attaching the div created here in js into the hardcoded html div
                        $("#characters").append(craziesDiv);
                    }
                });
            });
          
            //making the gifs start and stop when clicked
            $(document).on("click", ".character-img", function () {

                var whatItBe = $(this).attr("data-state");

                if (whatItBe === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                }
                else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });

    gifButtons();

});


