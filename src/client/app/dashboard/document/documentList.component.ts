import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AttachmentService, UserService, AlertService } from '../../services/index';
import { AttachmentModel } from '../../models/index';

@Component({
	moduleId: module.id,
    selector: 'my-documents-list',
    templateUrl: 'documentList.component.html'
})

export class DocumentListComponent implements OnInit { 
	
    @Input() attachments: AttachmentModel[] = null;
    
    actionPassed: string = 'myDocuments';
    
    title: string;
    
    loadingArr: boolean[] = [];
    
	constructor(
        private route: ActivatedRoute,
        private attachmentService: AttachmentService,
        private userService: UserService,
        private alertService: AlertService
	) {}
	
	ngOnInit() {
        
        for(var i=0; i<this.loadingArr.length; i++){
            this.loadingArr[i] = false;
        }
        
        if(this.route.data && this.attachments == null) {
            this.route.data
                .subscribe(
                    value => { 
                        this.actionPassed = value['action'];
                    }
                );    
        
            switch(this.actionPassed) {
                case 'myDocuments':
                    this.title = "My Documents";
                    this.getCurrentUserAttachments();
                    break;
            }
        }
        
    }
    
    deleteAttachment(attachmentId: number, delIndex: number) {
        var result = confirm("Are you sure you want to delete this document?");
        if (!result) {
            return;
        }
        
        this.loadingArr[delIndex] = true;
        
        this.attachmentService
            .deleteAttachment(attachmentId)
            .subscribe(
                () => {
                    this.getCurrentUserAttachments();
                    this.loadingArr[delIndex] = false;
                    this.alertService.success('Attachment deleted successfully!');                    
                },
                (err) => {
                    this.loadingArr[delIndex] = false;
                    this.alertService.error('I am sorry, something went wrong. Please try again later!');
                }
            );
    }
    
    getCurrentUserAttachments() {
        this.attachmentService
            .getUserAttachments()
            .subscribe(
                (data: AttachmentModel[]) => {
                    console.log('My Docs: ', data);
                    this.attachments = data;
                },
                (err) => {
                    this.alertService.error('I am sorry, something went wrong. Please try again later!');
                }
            );
    }
}
