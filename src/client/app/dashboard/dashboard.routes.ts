import { Route } from '@angular/router';
import { DocumentRoutes } from './document/index';
import { HomeRoutes } from './home/index';
import { BlankPageRoutes } from './blank-page/index';
import { UserRoutes } from './user/user.routes';
import { DashboardComponent } from './index';

import { AuthGuard } from '../guards/index';

export const DashboardRoutes: Route[] = [
  	{
    	path: 'dashboard',
    	component: DashboardComponent,
    	children: [
        ...DocumentRoutes,
        ...HomeRoutes,
        ...BlankPageRoutes,
        ...UserRoutes,
    	],
      canActivate: [AuthGuard]
  	}
];
