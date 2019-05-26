$.getJSON("/articles", function(data) {

    for (var i = 0; i < data.length; i++) {

      $("#articleHolder").append("<p data-id='" + data[i]._id + "'>" + data[i].title 
      + "<br />" + "Link: " + data[i].url + "<br />" + data[i].summary + "</p>"
      + "------------------------------------");
    }
  });