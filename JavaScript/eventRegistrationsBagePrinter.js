// this script requires jQuery

function checkClientId()
{
   if( clientId ) return;
   
   alert("clientId variable is not declared");
}
checkClientId();

var api = WApublicApi(clientId);
api.apiRequest(api.apiUrls.me, function (data, textStatus, jqXhr) {    
    alert("Hello " + data.FirstName + " " + data.LastName +" !<br>Spirits say that your ID is '" + data.Id + "' and your email is '" + data.Email + "'.");           
});

function WApublicApi(clientId)
{
   this.clientId = clientId;
   this.apiRequest = function(apiUrl, onSuccess, onError) {  
      $.ajax({
         url: apiUrl,
         type: "GET",
         dataType: "json",
         cache: false,
         async: true,     
         headers: { "clientId": clientId },
         success: onSuccess, 
         error: onError
     });
   };
   
   $.ajax({
         url: "/sys/api/v2/accounts",
         type: "GET",
         dataType: "json",
         async: false,     
         headers: { "clientId": clientId },
         success: function (data, textStatus, jqXhr) {    
            this.accountId = data[0].Id;
            this.apiUrls = {
               me: '/sys/api/v2/accounts/' + this.accountId + '/contacts/me',
               contacts: '/sys/api/v2/accounts/' + this.accountId + '/contacts',
               events: '/sys/api/v2/accounts/' + this.accountId + '/events',
               registrations: '/sys/api/v2/accounts/' + this.accountId + '/events',
               contactFields: '/sys/api/v2/accounts/' + this.accountId + '/contactFields',
               invoices: '/sys/api/v2/accounts/' + this.accountId + '/invoices',
               payments: '/sys/api/v2/accounts/' + this.accountId + '/payments',
               tenders: '/sys/api/v2/accounts/' + this.accountId + '/tenders'
            };
         }, 
         error: function (jqXHR, textStatus, errorThrown) {
             throw { status: textStatus, internalError: errorThrown };
         }
     });
}

/*
   function (data, textStatus, jqXhr) {    
        $("#api_result").html("Hello " + data.FirstName + " " + data.LastName +" !<br>Spirits say that your ID is '" + data.Id + "' and your email is '" + data.Email + "'.");
          
   $('#name').html(data.FirstName+" "+data.LastName);
$('#status').html(data.FirstName);             
      },
*/

/*
   function (jqXHR, textStatus, errorThrown) {
        var loginUrl = "/sys/login?ReturnUrl=" + encodeURIComponent('/JS-powered-page');
        $("#api_result").html("Looks like you are not authenticated. Please <a href='" + loginUrl + "'>log in<\/a> and come back.<br> Error: " +  textStatus + " (" + jqXHR.status + ")  " + errorThrown);}
*/