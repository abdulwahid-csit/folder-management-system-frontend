import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationRoutingModule } from './application-routing.module';
import { ApplicationListComponent } from './application-list/application-list.component';
import { CreateApplicationComponent } from './create-application/create-application.component';
import { ApplicationDetailsComponent } from './application-details/application-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { InlineSVGModule } from 'ng-inline-svg';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ApplicationListComponent,
    CreateApplicationComponent,
    ApplicationDetailsComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ApplicationRoutingModule,
    SharedModule,
    InlineSVGModule
  ]
  
})
export class ApplicationModule { }
