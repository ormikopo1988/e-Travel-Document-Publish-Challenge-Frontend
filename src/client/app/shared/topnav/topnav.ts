import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AuthGuard } from '../../guards/index';

import { CurrentUserService } from '../../helpers/index';

import { CurrentUser } from '../../models/index';

import { AuthenticationService, UserService } from '../../services/index';

@Component({
	moduleId: module.id,
	selector: 'top-nav',
	templateUrl: 'topnav.html',
})

export class TopNavComponent implements OnInit {

	isLoggedIn: boolean = false;

	currentUser = {};

	intervals: any[] = [];

	constructor(
		private authGuard: AuthGuard,
		private currentUserService: CurrentUserService,
		private userService: UserService,
		private authenticationService: AuthenticationService,
		private route: ActivatedRoute,
		private router: Router
	) { }

	ngOnInit() {

		if (this.authGuard.isUserLoggedIn()) {
			this.isLoggedIn = true;
		}

		if (localStorage.getItem('currentUser')) {
			this.userService
				.getCurrentUserInfo()
				.subscribe(
				(data) => {
					this.currentUser = data;
					console.log('Current User: ', this.currentUser);
				},
				(err) => {
					console.log('ERROR: ', err);
				});
		}
	}

	logOut() {
		this.authenticationService.logout();
		this.router.navigate(['/login']);
	}

}
