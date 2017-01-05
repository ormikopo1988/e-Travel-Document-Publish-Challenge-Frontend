import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AttachmentModel } from '../models/index';

import { CONFIGURATION } from '../shared/app.constants';
 
@Injectable()
export class AttachmentService {
    
    constructor(private http: Http) { }
    
    createNewAttachment(newAttachment: AttachmentModel) {
        let createURL = CONFIGURATION.azureUrls.webApi + 'api/attachments';
        
        let options = this.jwt();
        
        let postRequestBody = JSON.stringify(newAttachment);
        
        return this.http.post(createURL, postRequestBody, options)
                        .map((response: Response) => response.json())
                        .catch(res => {
                            console.log('CATCH: ', res.json());
                            throw(res.json());
                        });
    }
    
    getUserAttachments()
    {
        let URL = CONFIGURATION.azureUrls.webApi + 'api/attachments';
        
        let options = this.jwt();

        return this.http.get(URL , options)
                        .map((response:Response) =>response.json())
                        .catch(res => {
                            console.log('CATCH: ', res.json());
                            throw(res.json());
                        });
    }

    deleteAttachment(attachmentId: number){
        let URL = CONFIGURATION.azureUrls.webApi+'api/attachments/' + attachmentId;
        
        let options = this.jwt();

        return this.http.delete(URL, options)
                        .map((response:Response) => response)
                        .catch(res => {
                            console.log('CATCH: ', res.json());
                            throw(res.json());
                        });
    }
    
    // private helper methods
 
    private jwt() {
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