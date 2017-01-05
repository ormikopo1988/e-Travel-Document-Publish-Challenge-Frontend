import { Route } from '@angular/router';

import { DocumentCreateComponent } from './documentCreate.component';
import { AuthGuard } from '../../guards/index';

export const DocumentCreateRoutes: Route[] = [
  	{
    	path: 'create',
    	component: DocumentCreateComponent,
		canActivate: [AuthGuard]
  	}
];