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
        
        let options = CONFIGURATION.jwt();
        
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
        
        let options = CONFIGURATION.jwt();

        return this.http.get(URL , options)
                        .map((response:Response) =>response.json())
                        .catch(res => {
                            console.log('CATCH: ', res.json());
                            throw(res.json());
                        });
    }

    deleteAttachment(attachmentId: number){
        let URL = CONFIGURATION.azureUrls.webApi+'api/attachments/' + attachmentId;
        
        let options = CONFIGURATION.jwt();

        return this.http.delete(URL, options)
                        .map((response:Response) => response)
                        .catch(res => {
                            console.log('CATCH: ', res.json());
                            throw(res.json());
                        });
    }
 
}