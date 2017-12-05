function UserObject(myEmail, myPassword) {
    
    this.email = myEmail;
    this.password = myPassword;
    this.empKey = sessionStorage.empresa_key;
    this.token = sessionStorage.token;  
    this.toJsonString = function () { return JSON.stringify(this); };

};


function addUserDemo()
{
	try
  {


    alert("token : " + sessionStorage.token);

  	var myData = new UserObject(
     $("#email").val(), 
     $("#password").val(), 
     );
  	alert(myData.toJsonString());

  	 jQuery.ajax({
           type: "POST",
           url: "https://segundoparcial-christian.appspot.com/_ah/api/usuarios_api/v1/users/insert",
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



