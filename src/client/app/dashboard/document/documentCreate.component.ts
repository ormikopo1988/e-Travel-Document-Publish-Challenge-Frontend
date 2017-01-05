import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AttachmentModel } from '../../models/index';

import { AlertService, AttachmentService } from '../../services/index';

@Component({
	moduleId: module.id,
	selector: 'document-create-cmp',
	templateUrl: 'documentCreate.component.html'
})
export class DocumentCreateComponent implements OnInit {
	
	newAttachment: AttachmentModel = new AttachmentModel();
	
	loading = false;
    
    fileSelected = false;
	
	constructor(
		private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
		private attachmentService : AttachmentService 
	) { }
	
    ngOnInit() {
        
	}
    
    fileChange(event:any) {

        let fileList: FileList = event.target.files;
    
        if(fileList.length > 0)
        {
            let file: File = fileList[0];
            console.log('File: ', file);
            this.fileSelected = true;
            this.readFile(file);
        }
        else {
            this.fileSelected = false;
            this.newAttachment.MimeType = "";
            this.newAttachment.content = "";
        }
    }
    
    readFile(file: File) {
        console.log('FILE TYPE: ', file.type);
        
        if(!file) {
            alert("Failed to load file");
            this.fileSelected = false;
            return;
        }
    
        else if (!file.type.match('text.*')) {
		    alert(file.name + " is not a valid file (.txt)");
            this.fileSelected = false;
            return;
        }
            
        else {
            this.newAttachment.MimeType = file.type;
            
            var r = new FileReader();
            
            var self = this;
            
            r.onload = function(e: any) { 
                console.log('E: ', e);
                var contents = e.currentTarget.result;
                
                console.log( "Got the file.n" 
                    +"name: " + file.name + "\n"
                    +"type: " + file.type + "\n"
                    +"size: " + file.size + " bytes\n"
                    + "starts with: " + contents
                );
                
                //self.newAttachment.content = btoa(contents);
               self.newAttachment.content = contents;
            }
            
            r.readAsText(file);
        }
    }
    
    uploadDocument() {
        this.loading = true;
        
        console.log('ATTACHMENT TO SEND: ', this.newAttachment);
        
        this.attachmentService.createNewAttachment(this.newAttachment).subscribe(
                    (data) => {
                        // set success message
                        this.loading = false;
                        this.newAttachment = new AttachmentModel();
                        this.alertService.success('Attachment saved successfully!', true);
                        this.router.navigate(['/dashboard/documents/myDocuments']);
                    },
                    (err) => {
                        this.alertService.error('I am sorry, something went wrong. Please try again later!');
                        this.loading = false;
                    });
    }
   
}