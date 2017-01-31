import { Headers, RequestOptions } from '@angular/http';

export let CONFIGURATION = {
    /*azureUrls: {
        authServer: 'http://etravelauthserver.azurewebsites.net/',
        webApp: 'http://etravelwebapp.azurewebsites.net/',
        webApi: 'http://etravelwebapi.azurewebsites.net/'
    },
    */
    
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