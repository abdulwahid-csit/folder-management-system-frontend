import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationRoutingModule } from './application-routing.module';
import { ApplicationListComponent } from './application-list/application-list.component';
import { CreateApplicationComponent } from './create-application/create-application.component';
import { ApplicationDetailsComponent } from './application-details/application-details.component';


@NgModule({
  declarations: [
    ApplicationListComponent,
    CreateApplicationComponent,
    ApplicationDetailsComponent
  ],
  imports: [
    CommonModule,
    ApplicationRoutingModule
  ]
})
export class ApplicationModule { }
