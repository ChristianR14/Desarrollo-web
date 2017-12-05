function InstructorObject(myName, myLastName, myAge, mySport) {
    
    this.name = myName;
    this.lastname = myLastName;
    this.age = myAge;
    this.sport = mySport;
    this.token = sessionStorage.token;
    this.urlImage = sessionStorage.urlImage;
    this.toJsonString = function () { return JSON.stringify(this); };

};



function updateInstructorDemo(entityKey)
{
  try
  {

    alert("token : " + sessionStorage.token);

    var myData = new InstructorObject(
     $("#name").val(), 
     $("#lastname").val(), 
     $("#age").val(), 
     $("#sport").val(),
     $("#entityKey").val()
     );
    

     jQuery.ajax({
           type: "POST",
           url: "/_ah/api/instructors_api/v1/instructors/update",
           data: myData.toJsonString(),
           contentType: "application/json; charset=utf-8",
           dataType: "json",
           success: function (response) {
                // do something
                alert (response.code + " " + response.message);
                 window.location.href = '/instructors'
           },
       
           error: function (error) {            
                // error handler
                alert("error :" + error.message)
           }

       });

   }
   catch(error)
   {
    alert(error);
   }

}




function addInstructorDemo()
{
	try
  {


    alert("token : " + sessionStorage.token);

  	var myData = new InstructorObject(
     $("#name").val(), 
     $("#lastname").val(), 
     $("#age").val(), 
     $("#sport").val() 
     );
  	alert(myData.toJsonString());

  	 jQuery.ajax({
           type: "POST",
           url: "/_ah/api/instructors_api/v1/instructors/insert",
           data: myData.toJsonString(),
           contentType: "application/json; charset=utf-8",
           dataType: "json",
           success: function (response) {
                // do something
                alert (response.code + " " + response.message);
           },
       
           error: function (error) {            
                // error handler
                alert("error :" + error.message)
           }

       });

   }
   catch(error)
   {
    alert(error);
   }

}


function TokenObject() {
    
    this.tokenint = sessionStorage.token;
    this.toJsonString = function () { return JSON.stringify(this); };

};





function getInstructorList()
{
  try
  {


    //alert("token : " + sessionStorage.token);

    var myData = new TokenObject();
    
    alert(myData.toJsonString());

     jQuery.ajax({
           type: "POST",
           url: "https://segundoparcial-christian.appspot.com/_ah/api/instructors_api/v1/instructos/list",
           data: myData.toJsonString(),
           contentType: "application/json; charset=utf-8",
           dataType: "json",
           success: function (response) {
                // do something
                
                alert (response.data);
           },
       
           error: function (error) {            
                // error handler
                alert("error :" + error.message)
           }

       });

   }
   catch(error)
   {
    alert(error);
   }

}

function uploadDemo()

{

    var file_data = $("#uploaded_file").prop("files")[0];
    var form_data = new FormData();
    form_data.append("uploaded_file", file_data)

    jQuery.support.cors = true;
    try
    {
     $.ajax({
                url: "/up",
                dataType: 'text',
                cache: false,
                contentType: false,
                processData: false,
                data: form_data,
                type: 'post',
                crossDomain: true,
                success: function(response){

                                document.getElementById("preview").src=response;

                                sessionStorage.urlImage = response;

                                document.getElementById("url_photo").value = response;
                }
      });
    }
    catch(e)
    {
      alert("error : " +  e);
     }
}
