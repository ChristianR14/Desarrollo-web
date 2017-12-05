function ClientObject(myName, myLastName, myAge, myPago, mySport) {
    
    this.name = myName;
    this.lastname = myLastName;
    this.age = myAge;
    this.pago = myPago;
    this.sport = mySport;
    this.token = sessionStorage.token;
    this.urlImage = sessionStorage.urlImage;
    this.toJsonString = function () { return JSON.stringify(this); };

};


function addClientDemo()
{
	try
  {


    alert("token : " + sessionStorage.token);

  	var myData = new ClientObject(
     $("#name").val(), 
     $("#lastname").val(), 
     $("#age").val(), 
     $("#pago").val(), 
     $("#sport").val() 
     );
  	alert(myData.toJsonString());

  	 jQuery.ajax({
           type: "POST",
           url: "/_ah/api/clients_api/v1/clients/insert",
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


function getClientList()
{
  try
  {


    //alert("token : " + sessionStorage.token);

    var myData = new TokenObject();
    
    alert(myData.toJsonString());

     jQuery.ajax({
           type: "POST",
           url: "/_ah/api/clients_api/v1/clients/list",
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


function updateClientDemo(entityKey)
{
  try
  {

    alert("token : " + sessionStorage.token);

    var myData = new ClientObject(
     $("#name").val(), 
     $("#lastname").val(), 
     $("#age").val(), 
     $("#pago").val(), 
     $("#sport").val(),
     $("#entityKey").val()
     );
    

     jQuery.ajax({
           type: "POST",
           url: "/_ah/api/clients_api/v1/clients/update",
           data: myData.toJsonString(),
           contentType: "application/json; charset=utf-8",
           cache: false, 
           processData: true, 
           dataType: "json",
           success: function (response) {
                // do something
                alert (response.code + " " + response.message);
                 window.location.href = '/clients'
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
