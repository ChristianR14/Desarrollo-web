function getinstructors() 
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
             var nombre = "<div class='col-md-3 col-sm-3' " +
        " data-wow-delay='0.2s'> " +
                        "<img src='" + tweet.urlImage + "'" +
                        " class='img-responsive' alt='team img' heigth='200' width='200'" +
                        " >" +
                        " <div class='section-title wow bounceIn'> " +
                        "<h5>Name: " + tweet.name + "</h5>" +
                        "<h5>Last name: " + tweet.lastname + "</h5>" +
                        "<h5>Age: " + tweet.age + "</h5>" +
                        "<h5>Sport: " + tweet.sport + "</h5>" +
                        " <a syle='btn-danger' href='/updateInstructor?myVar="+tweet.id+"'Key>Update</a>" +
                        "<script src='app/instructor.js'></script>" +
                        " <button onclick='deleteInstructor(\"" + tweet.id+ "\")' class='btn btn-danger'> " +
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


function deleteInstructor(entKey)
{
  try
  {
    var myData = new ConsigueOneProductObject(entKey); 
    alert(entKey);
    alert("Instructor erased");
    jQuery.ajax({
      url: "/_ah/api/instructors_api/v1/instructors/delete",
      dataType: 'json',
      cache: false, 
      contentType: 'application/json; charset=utf-8', 
      processData: true, 
      data: myData.toJsonString(),
      type: 'POST',
      crossDomain: true,
      success: function(response){
        window.location.href = '/instructors'
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