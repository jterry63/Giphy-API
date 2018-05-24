$(document).ready(function () {

    console.log("Hello, i'm working");

    var animals = ['Panda', 'Monkey', 'Kangaroo', 'Elephant', 'Tiger', 'Penguin', 'Polar Bear', 'Sloth', 'Lion'];

    function displayGif() {
        $('#gifs-appear-here').empty();
        var gif = $(this).attr('data-name');
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=ffQyjUG9YvVY2KYu9LQPMgxjzG51TZy8&limit=10";
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
                    var personImage = $("<img>");
                    personImage.attr("src", results[i].images.fixed_height.url);
                    gifDiv.prepend(p);
                    gifDiv.prepend(personImage);
                    $("#gifs-appear-here").prepend(gifDiv);
                };
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




    // $("button").on("click", function findGif() {
    //     var test = $(this).attr("data-animal");
    //     console.log(test);

    //         var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=ffQyjUG9YvVY2KYu9LQPMgxjzG51TZy8&limit=10";
    //         $.ajax({
    //             url: queryURL,
    //             method: "GET"
    //         })
    //             .then(function (response) {
    //                 var results = response.data;
    //                 for (var i = 0; i < results.length; i++) {
    //                     var gifDiv = $("<div class='item'>");
    //                     var rating = results[i].rating;
    //                     var p = $("<p>").text("Rating: " + rating);
    //                     var personImage = $("<img>");
    //                     personImage.attr("src", results[i].images.fixed_height.url);
    //                     gifDiv.prepend(p);
    //                     gifDiv.prepend(personImage);
    //                     $("#gifs-appear-here").prepend(gifDiv);

    //                 }

    //             });
    // //     });
    //     $('#addSearch').on('click', function addButton() {
    //         var newSearch = $('input').eq(0).val();
    //         var anotherGif = $("<button>").text(newSearch);
    //         $(this).attr("data-animal", newSearch);
    //         $("#buttons").append(anotherGif);
    //         return false;

    //     });
    renderButtons();
    $(document).on('click', '.topicBtn', '.gif', displayGif);
    // });
});