import { Route } from '@angular/router';

import { DocumentListComponent } from './documentList.component';
import { AuthGuard } from '../../guards/index';

export const DocumentListRoutes: Route[] = [
  	{
    	path: 'myDocuments',
    	component: DocumentListComponent, 
		data: {
			action: 'myDocuments'
		}
  	}
];