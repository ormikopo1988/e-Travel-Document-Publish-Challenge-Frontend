import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { DocumentCreateComponent } from './documentCreate.component';
import { DocumentListComponent } from './documentList.component';
import { DocumentComponent } from './document.component';

import { TruncateModule }   from '../../pipes/truncate.module';

import {
		TabsModule,
        ModalModule
	} from 'ng2-bootstrap/ng2-bootstrap';

@NgModule({
    imports: [
        CommonModule, 
        RouterModule, 
        FormsModule,
        TabsModule,
        ModalModule,
        TruncateModule
    ],
    declarations: [
        DocumentComponent, 
        DocumentCreateComponent,
        DocumentListComponent,
    ],
    exports: [
        DocumentComponent, 
        DocumentCreateComponent,
        DocumentListComponent,
    ]
})

export class DocumentModule { }