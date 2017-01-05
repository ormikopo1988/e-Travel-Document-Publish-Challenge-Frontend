import { Route } from '@angular/router';

import { DocumentCreateRoutes } from './documentCreate.routes';
import { DocumentListRoutes } from './documentList.routes';

import { DocumentComponent } from './index';

export const DocumentRoutes: Route[] = [
  	{
    	path: 'documents',
    	component: DocumentComponent,
    	children: [
        ...DocumentCreateRoutes,
        ...DocumentListRoutes,
    	]
  	}
];
