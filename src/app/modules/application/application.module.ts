import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationRoutingModule } from './application-routing.module';
import { ApplicationListComponent } from './application-list/application-list.component';
import { CreateApplicationComponent } from './create-application/create-application.component';
import { ApplicationDetailsComponent } from './application-details/application-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateApplicationComponent } from './update-application/update-application.component';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    ApplicationListComponent,
    CreateApplicationComponent,
    ApplicationDetailsComponent,
    UpdateApplicationComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ApplicationRoutingModule,
    SharedModule,
    NgSelectModule

  ]

})
export class ApplicationModule { }
