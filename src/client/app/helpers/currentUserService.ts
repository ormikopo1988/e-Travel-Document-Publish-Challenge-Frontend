import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { CONFIGURATION } from '../shared/app.constants';

@Injectable()
export class CurrentUserService {
    
    constructor(private http: Http) { }
   
    getUserMainInfo() {
        
        let userURL = CONFIGURATION.azureUrls.webApi+'api/users/findByUsername';
        
        let options = CONFIGURATION.jwt();
        
        let username = JSON.parse(localStorage.getItem('currentUser')).username;
        
        let postRequestBody = JSON.stringify({
            username: username
        });
        
        return this.http.post(userURL, postRequestBody, options)
            .map((response: Response) => response.json())
            .catch(res => {
                console.log('CATCH: ', res.json());
                throw(res.json());
            });
    }
    
}