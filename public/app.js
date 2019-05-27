$.getJSON("/articles", function(data) {

    for (var i = 0; i < data.length; i++) {

      $("#articleHolder").append("<p data-id='" + data[i]._id + "'>" + "<b>" +data[i].title + "</b>" 
      + "<br />" + "</p>" + "<p>" + data[i].summary + "<br />" + "</p>" + "<p>" + "Link: " + data[i].url + "</p>"
      + "<p>" + "Posted: " + data[i].timeStamp  + " ago" +"</p>"
      + "--------------------------------------------------------------------");
    }
  });