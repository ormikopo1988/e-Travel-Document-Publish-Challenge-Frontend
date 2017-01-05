import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../../services/index';

@Component({
	moduleId: module.id,
	selector: 'sidebar-cmp',
	templateUrl: 'sidebar.html'
})

export class SidebarComponent implements OnInit {
	isActive = false;
	showMenu: string = '';
	
	isUserLoggedIn: boolean;
	
	constructor(
		private authenticationService: AuthenticationService,
		private route: ActivatedRoute,
		private router: Router
	) { }
	
	ngOnInit() {
		if (localStorage.getItem('currentUser')) {
			this.isUserLoggedIn = true;
		} else {
			this.isUserLoggedIn = false;
		}
	}
	
	eventCalled() {
		this.isActive = !this.isActive;
	}
	
	addExpandClass(element: any) {
		if (element === this.showMenu) {
			this.showMenu = '0';
		} else {
			this.showMenu = element;
		}
	}
	
	logOut() {
		this.authenticationService.logout();
		this.router.navigate(['/login']);
	}
	
}
