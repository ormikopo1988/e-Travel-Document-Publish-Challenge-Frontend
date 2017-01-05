import { Headers, RequestOptions } from '@angular/http';

export let CONFIGURATION = {
    /*azureUrls: {
        authServer: 'http://viva5authserver.azurewebsites.net/',
        chatServer: 'http://viva5chat.azurewebsites.net',
        webApp: 'http://viva5webapp.azurewebsites.net/',
        webApi: 'http://viva5webapi.azurewebsites.net/'
    },*/
    azureUrls: {
        authServer: 'http://localhost:56478/',
        webApp: 'http://localhost:5555/',
        webApi: 'http://localhost:56378/'
    },
    
    jwt: function() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
        if (currentUser && currentUser.user.access_token) {
            
            let headers = new Headers({
                'Content-Type': 'application/json', 
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + currentUser.user.access_token
            });
            
            return new RequestOptions({ headers: headers });
        } 
        
        else {
            return new RequestOptions({});
        }
    }
}