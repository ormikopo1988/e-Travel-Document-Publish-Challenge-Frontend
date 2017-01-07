import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { GenericUser } from '../models/index';

import { CONFIGURATION } from '../shared/app.constants';

@Injectable()
export class UserService {

    constructor(private http: Http) { }

    getAllUsers() {
        let allUsersURL = CONFIGURATION.azureUrls.webApi+'api/users';
    
        let headers = new Headers({
            'Accept': 'application/json',
        });

        let options = new RequestOptions({ headers: headers })

        return this.http.get(allUsersURL, options)
            .map((response: Response) => response.json())
            .catch(res => {
                console.log('CATCH: ', res.json());
                throw (res.json());
            });

    }

    getLastTenUsers() {
        let URL = CONFIGURATION.azureUrls.webApi+'api/users/lastTen';
    
        let headers = new Headers({
            'Accept': 'application/json',
        });

        let options = new RequestOptions({ headers: headers })

        return this.http.get(URL, options)
            .map((response: Response) => response.json())
            .catch(res => {
                console.log('CATCH: ', res.json());
                throw (res.json());
            });

    }
    
    getCurrentUserInfo() {
        let url = CONFIGURATION.azureUrls.webApi+'api/users/getCurrentUserInfo';

        let options = CONFIGURATION.jwt();

        return this.http.get(url, options)
            .map((response: Response) => response.json())
            .catch(res => {
                console.log('CATCH: ', res.json());
                throw (res.json());
            });
    }

    getUserMainInfo(userId: number) {

        let userURL = CONFIGURATION.azureUrls.webApi+'api/users/' + userId;
        
        let headers = new Headers({
            'Accept': 'application/json',
        });

        let options = new RequestOptions({ headers: headers })

        return this.http.get(userURL, options)
            .map((response: Response) => response.json())
            .catch(res => {
                console.log('CATCH: ', res.json());
                throw (res.json());
            });
    }
    
    getAllUsersByName(searchTerm: string) {
        let URL = CONFIGURATION.azureUrls.webApi+'api/users/getAllUsersByName/' + searchTerm;

        let headers = new Headers({
            'Accept': 'application/json',
        });

        let options = new RequestOptions({ headers: headers });

        return this.http.get(URL, options)
            .map((response: Response) => response.json())
            .catch(res => {
                console.log('CATCH: ', res.json());
                throw (res.json());
            });

    }
    
    isRequestorThisUser(Username: string) {
        
        if (localStorage.getItem('currentUser').includes(Username)) {
            return true;
        }
        
        return false;
    }

    updateUser(user: GenericUser) {
        let editUserURL = CONFIGURATION.azureUrls.webApi+'api/users/';

        let options = CONFIGURATION.jwt();

        let putRequestBody = JSON.stringify(user);

        return this.http.put(editUserURL, putRequestBody, options)
            .map((response: Response) => response)
            .catch(res => {
                console.log('CATCH: ', res.json());
                throw (res.json());
            });
    }

}