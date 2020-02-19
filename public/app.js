$.getJSON("/articles", data => {

    for (var i = 0; i < data.length; i++) {

        $("#articleHolder").append("<article data-id='" + data[i]._id + "'>" + "<b>" + data[i].title + "</b>"
            + "<br />" + "</article>" + "<p>" + data[i].summary + "<br />" + "</p>" + "<p>" + "<a href=" + data[i].url + ">" + "Link" + "</a>" 
            + "</p>" + "<p>" + "Posted: " + data[i].timeStamp + " ago" + "</p>"
            + "--------------------------------------------------------------------");
    }
});

$(document).on("click", "article", () => {

    $("#noteHolder").empty();

    let thisId = $(this).attr("data-id");
  

    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })

      .then(data => {
        console.log(data);

        $("#noteHolder").append("<h2>" + data.title + "</h2>");

        $("#noteHolder").append("<input id='titleinput' name='title' >");

        $("#noteHolder").append("<textarea id='bodyinput' name='body'></textarea>");

        $("#noteHolder").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

        if (data.note) {

          $("#titleinput").val(data.note.title);

          $("#bodyinput").val(data.note.body);
        }
      });
  });

  $(document).on("click", "#savenote", () => {

    let thisId = $(this).attr("data-id");
  
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        title: $("#titleinput").val(),
        body: $("#bodyinput").val()
      }
    })

      .then(function(data) {
        console.log(data);
        $("#notes").empty();
      });
  
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });