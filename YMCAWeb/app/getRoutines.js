
function getTweets() 
{

  sessionStorage.empresa = "kubeet";

    jQuery.support.cors = true;
    try
    {                         
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
                        " <a syle='btn-danger' href='/updateTweet?myVar="+tweet.id+"'Key>Update</a>" +
                        "<script src='app/client.js'></script>" +
                        " <button onclick='deleteTweet(\"" + tweet.id+ "\")' class='btn btn-danger'> " +
                        " <i class = 'fa fa fa-ban'></i> Delete </button>" +
                        "</div>" +
                        "</div>" 
                       $("#home").append(nombre);

                });
     
   }
        });           
     
    }
 catch(e)
    {
      alert("error : " +  e);
     }
}



function ConsigueOneProductObject(entiKey) {        
    this.tokenint = sessionStorage.token;
    this.entityKey = entiKey;
    this.toJsonString = function () { return JSON.stringify(this); };
};


function deleteTweet(entKey)
{
  try
  {

    var myData = new ConsigueOneProductObject(entKey); 
    alert(myData.toJsonString());
    alert("Client erased");
    jQuery.ajax({
      url: "/_ah/api/tweet_api/v1/tweet/delete",
      dataType: 'json',
      cache: false, 
      contentType: 'application/json; charset=utf-8', 
      processData: true, 
      data: myData.toJsonString(),
      type: 'POST',
      crossDomain: true,
      success: function(response){
        window.location.href = '/routines'
      },
      error: function(error){
        alert(error)
      }
    });
  }
  catch(error)
  {
    alert(error)
  }
}