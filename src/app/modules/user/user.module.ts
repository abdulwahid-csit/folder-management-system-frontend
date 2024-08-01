import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';

import { InlineSVGModule } from 'ng-inline-svg';
import { SharedModule } from 'src/app/shared/shared.module';





@NgModule({
  declarations: [
    UserListComponent,
   

  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    InlineSVGModule,
    SharedModule
  ]
  
})
export class UserModule { }
