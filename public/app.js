$.getJSON("/articles", function (data) {

    for (var i = 0; i < data.length; i++) {

        $("#articleHolder").append("<p data-id='" + data[i]._id + "'>" + "<b>" + data[i].title + "</b>"
            + "<br />" + "</p>" + "<p>" + data[i].summary + "<br />" + "</p>" + "<p>" + "<a href=" + data[i].url + ">" + "Link" + "</a>" 
            + "</p>" + "<p>" + "Posted: " + data[i].timeStamp + " ago" + "</p>"
            + "--------------------------------------------------------------------");
    }
});

$(document).on("click", "p", function() {
    // Empty the notes from the note section
    $("#noteHolder").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");
  
    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      // With that done, add the note information to the page
      .then(function(data) {
        console.log(data);
        // The title of the article
        $("#noteHolder").append("<h2>" + data.title + "</h2>");
        // An input to enter a new title
        $("#noteHolder").append("<input id='titleinput' name='title' >");
        // A textarea to add a new note body
        $("#noteHolder").append("<textarea id='bodyinput' name='body'></textarea>");
        // A button to submit a new note, with the id of the article saved to it
        $("#noteHolder").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
  
        // If there's a note in the article
        if (data.note) {
          // Place the title of the note in the title input
          $("#titleinput").val(data.note.title);
          // Place the body of the note in the body textarea
          $("#bodyinput").val(data.note.body);
        }
      });
  });

  $(document).on("click", "#savenote", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
  
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        title: $("#titleinput").val(),
        // Value taken from note textarea
        body: $("#bodyinput").val()
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#notes").empty();
      });
  
    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });