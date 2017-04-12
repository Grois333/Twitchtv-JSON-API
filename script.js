var streamers = ["medrybw", "freecodecamp", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "comster404", "brunofin", "thomasballinger", "noobs2ninjas", "beohoff", "AegisRick", "Yoowy", "FireFistAce11"];

var tempObj;

//var idnumber="5j0r5b7qb7kro03fvka3o8kbq262wwm";

//get data and display
streamers.forEach(function(streamer) {
  $.when(
    $.getJSON("https://api.twitch.tv/kraken/streams/" + streamer + "?client_id=xg40uchhzfc5g6jyw8hvzee6shdvcr&callback=?"),
    $.getJSON("https://api.twitch.tv/kraken/users/" + streamer + "?client_id=xg40uchhzfc5g6jyw8hvzee6shdvcr&callback=?")
  ).then(function(a, b) {
    tempObj = {};
    tempObj.name = b[0].display_name;
    
    if (b[0].logo === null) {
      tempObj.logo = "http://placehold.it/30x30";
    } else {
      tempObj.logo = b[0].logo;
    }
    
    if (a[0].stream === null) {
      tempObj.online = false;
    } else {
      tempObj.online = true;
      var status = a[0].stream.channel.status;
      if (status.length > 35) { 
        tempObj.status = status.substring(0, 32) + "...";
      } else { 
        tempObj.status = status; 
      }
    }
    
  }).done(function() {
    if (tempObj.online) {
      var li = "<li class='list-group-item online'>";
      var icon = "<span class='glyphicon glyphicon-ok online-icon green' aria-hidden='true'></span>" + 
                 "<br><span class='game'>" + tempObj.status  + "</span></span>";
    } else {
      var li = "<li class='list-group-item offline'>";
      var icon = "<span class='glyphicon glyphicon-remove online-icon red' aria-hidden='true'></span>";
    }
    
    $("#streamers").append(
      "<a href='http://twitch.tv/" + tempObj.name + "' target='_blank'>" +
      li +
      "<img src='" + tempObj.logo + "'>" +
      "<span class='username'>" + tempObj.name + "</span>" +
      icon + "</li></a>");
  });
});

// filtering options
var init = $(".allFilter");
setBackgroundColor(init);

$(".allFilter").click(function() {
  var element = $(this);
  setBackgroundColor(element);
  $(".online").removeClass("hide");
  $(".offline").removeClass("hide");
});

$(".offlineFilter").click(function() {
  var element = $(this);
  setBackgroundColor(element);
  $(".offline").removeClass("hide");
  $(".online").addClass("hide");
});

$(".onlineFilter").click(function() {
  var element = $(this);
  setBackgroundColor(element);
  $(".online").removeClass("hide");
  $(".offline").addClass("hide");
});

function setBackgroundColor(element) {
  $(".filters > li").css("background-color", "rgba(0, 0, 0, 0.62)");
  $("li > a").css("color", "white");
  element.parent().css("background-color", "rgba(0, 0, 0, 0.62)");
  element.css("color", "white");
}

//search
$("input").keyup(function() {
  var search = $("input").val().toLowerCase();
  var regex = new RegExp(search);
  $(".username").parent().css("display", "");
  $(".username").each(function() {
    var username = $(this).text().toLowerCase();
    if (!regex.test(username)) {
      $(this).parent().css("display", "none")
    }
  });
});
