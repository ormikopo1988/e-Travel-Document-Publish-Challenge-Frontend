import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AttachmentService, AlertService, UserService } from '../../services/index';

import { GenericUser } from '../../models/index';

import { CurrentUserService } from '../../helpers/index';

import { AuthGuard } from '../../guards/index';

@Component({
	moduleId: module.id,
	selector: 'lastUsersTimeline-cmp',
	templateUrl: 'lastUsersTimeline.html',
	//styleUrls: ['timeline.css'],
})
export class LastUsersTimelineComponent implements OnInit {

	lastUsers: GenericUser[] = [];

	constructor(
		private alertService: AlertService,
		private authGuard: AuthGuard,
		private userService: UserService,
		private attachmentService: AttachmentService
	) { }

	ngOnInit() {

		if (localStorage.getItem('currentUser')) {
			let self = this;
			// first loading
			self.userService
				.getLastTenUsers()
				.subscribe(
				(data: GenericUser[]) => {
					console.log('Last Ten Registered Users in home...');
					self.lastUsers = data;
				},
				(err: any) => {
					self.alertService.error('I am sorry, something went wrong. Please try again later!');
					console.log('ERROR: ', err);
				});
		}
	}

}

///////////////////////////////////////////////////////////////////////

@Component({
	moduleId: module.id,
	selector: 'home-cmp',
	templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
	isRequestorLoggedIn: boolean = false;

	currentUser: any = null;

	constructor(
		private alertService: AlertService,
		private authGuard: AuthGuard,
		private currentUserService: CurrentUserService,
		private userService: UserService
	) { }

	ngOnInit() {
		if (this.authGuard.isUserLoggedIn())
			this.isRequestorLoggedIn = true;

		if (localStorage.getItem('currentUser')) {
			this.userService
				.getCurrentUserInfo()
				.subscribe(
				(data) => {
					this.currentUser = data;
				},
				(err) => {
					this.alertService.error('I am sorry, something went wrong. Please try again later!');
					console.log('ERROR: ', err);
				});

		}
	}
}