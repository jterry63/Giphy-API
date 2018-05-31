$(document).ready(function () {

    console.log("Hello, i'm working");

    var animals = ['Hippo', 'Lion', 'Panda', 'Monkey', 'Elephant', 'Llama', 'Giraffe', 'Koala'];

    function displayGif() {
        $('#gifs-appear-here').empty();
        var gif = $(this).attr('data-name');
        console.log(gif);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + 'Baby ' + gif + "&api_key=ffQyjUG9YvVY2KYu9LQPMgxjzG51TZy8&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                var results = response.data;
                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div class='item'>");
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);
                    var personImage = $('<img class="pics">').attr('src', gifStill).data('still', gifStill).data('animate', gifAuto).data('state', 'still');
                    personImage.attr("src", results[i].images.fixed_height.url);
                    gifDiv.prepend(p);
                    gifDiv.prepend(personImage);
                    $("#gifs-appear-here").prepend(gifDiv);
                    //grab moving gif     
                    var gifAuto = response.data[i].images.fixed_height.url;
                    //grab still image 
                    var gifStill = response.data[i].images.fixed_height_still.url;
                    //
                    var gifFull = $('<img class="pics">').attr('src', gifStill).data('still', gifStill).data('animate', gifAuto).data('state', 'still');
                };

                $('.pics').on('click', function () {
                    console.log('click');
                    var state = $(this).data('state');
                    console.log(state)
                    if (state == 'still') {
                        $(this).attr('src', $(this).data('animate'));
                        $(this).data('state', 'animate');
                    }
                    else {
                        $(this).attr('src', $(this).data('still'));
                        $(this).data('state', 'still');
                    };//else
                })
            });
    }

    function renderButtons() {
        $("#buttons").empty();
        $('#gifinput').val('');
        for (var i = 0, n = animals.length; i < n; i++) {
            console.log("go")
            var b = $('<button>')
            b.addClass('topicBtn');
            b.addClass('btn btn-info');
            b.attr('data-name', animals[i]);
            b.text(animals[i]);
            $('#buttons').append(b);
        }
    }

    $('#addGif').on('click', function () {
        var newAnimal = $('#gifinput').val().trim();
        animals.push(newAnimal);
        renderButtons();
        return false;
    });




    renderButtons();
    $(document).on('click', '.topicBtn', '.gif', displayGif);

});