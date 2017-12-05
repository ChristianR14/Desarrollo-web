
function getDataTweets() 
{

  sessionStorage.empresa = "kubeet";

    jQuery.support.cors = true;
    try
    {                         
     $.ajax({
        url: "/getinstructors",
        dataType: 'json',
        cache: false,
        contentType: false,
        processData: true,
        data: {empresa: sessionStorage.empresa},                         
        type: 'get',
        crossDomain: true,
        success: function(response) {
    tweets = response;
          //alert(response);
          tweets.forEach(function (tweet) 
          {
             var nombre = "<div class='col-md-3 col-sm-3'> " +
        
                        "<img src='" + tweet.urlImage + "'" +
                        " class='img-responsive' alt='team img' heigth='50' width='50'" +
                        " >" +
                        " <div> " +
                        "<h5>Name: " + tweet.name + "</h5>" +
                        "<h5>Last name: " + tweet.lastname + "</h5>" +
                        "<h5>Age: " + tweet.age + "</h5>" +
                        "<h5>Sport: " + tweet.sport + "</h5>" +
                        "</div>" +
                        "</div>" 
                       $("#instructors").append(nombre);
                });
     
   }
        });  

      $.ajax({
        url: "/getclients",
        dataType: 'json',
        cache: false,
        contentType: false,
        processData: true,
        data: {empresa: sessionStorage.empresa},                         
        type: 'get',
        crossDomain: true,
        success: function(response) {
    tweets = response;
          //alert(response);
          tweets.forEach(function (tweet) 
          {
             var nombre = "<div class='col-md-3 col-sm-3'> " +
                        "<img src='" + tweet.urlImage + "'" +
                        " class='img-responsive' alt='team img' heigth='50' width='50'" +
                        " >" +
                        " <div> " +
                        "<h5>Name:" + tweet.name + "</h5>" +
                        "<h5>Last name: " + tweet.lastname + "</h5>" +
                        "<h5>Age: " + tweet.age + "</h5>" +
                        "<h5>Sport: " + tweet.sport + "</h5>" +
                        "</div>" +
                        "</div>" 
                       $("#clients").append(nombre);
                });
     
   }
        });           
     
    $.ajax({
        url: "/gettweets",
        dataType: 'json',
        cache: false,
        contentType: false,
        processData: true,
        data: {empresa: sessionStorage.empresa},                         
        type: 'get',
        crossDomain: true,
        success: function(response) {
    tweets = response;
          //alert(response);
          tweets.forEach(function (tweet) 
          {
             var nombre = "<div class='col-md-3 col-sm-3' " +
        " data-wow-delay='0.2s'> " +
                        "<img src='" + tweet.urlImage + "'" +
                        " class='img-responsive' alt='team img' heigth='200' width='200'" +
                        " >" +
                        " <div class='section-title wow bounceIn'> " +
                        "<h5>Nombre:" + tweet.title + "</h3>" +
                        "<h5>Descripcion:" + tweet.description + "</h3>" +
                        "</div>" +
                        "</div>" 
                       $("#routines").append(nombre);

                });
     
   }
        }); 


    }
 catch(e)
    {
      alert("error : " +  e);
     }
}


