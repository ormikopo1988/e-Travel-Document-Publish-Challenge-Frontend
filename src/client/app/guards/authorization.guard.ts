/* 
	The authorization guard is used to prevent unauthorized users from accessing restricted routes
*/

import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AlertService } from '../services/index';

import { CONFIGURATION } from '../shared/app.constants';
 
@Injectable()
export class AuthorizationGuard {
 
    constructor(
		private router: Router,
		private http: Http,
        private alertService: AlertService
	) { }
    
    isRequestorDocumentCreator(attachmentId: number) {
        
        let url = CONFIGURATION.azureUrls.webApi+'api/attachments/'+attachmentId+'/isCurrentUserAttachmentCreator';
        
        let options = CONFIGURATION.jwt();
        
        return this.http.get(url, options)
                        .map((response: Response) => response.json())
                        .catch(err => {
                            console.log('CATCH: ', err.json());
                            throw(err.json());
                        });
    }
	
}