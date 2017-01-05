import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { CarouselModule, DropdownModule, AlertModule } from 'ng2-bootstrap/ng2-bootstrap';

import { LastUsersTimelineComponent } from './home.component';

import { TruncateModule }   from '../../pipes/truncate.module';

@NgModule({
    imports: [TruncateModule, RouterModule, CommonModule, CarouselModule, DropdownModule, AlertModule],
    declarations: [HomeComponent, LastUsersTimelineComponent],
    exports: [HomeComponent, LastUsersTimelineComponent]
})

export class HomeModule { }
