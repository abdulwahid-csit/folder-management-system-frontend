import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RolesPermissionRoutingModule } from './roles-permission-routing.module';
import { RolesPermissionListComponent } from './roles-permission-list/roles-permission-list.component';
import { CreateRoleComponent } from './create-role/create-role.component';

import { InlineSVGModule } from 'ng-inline-svg';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    RolesPermissionListComponent,
    CreateRoleComponent,
  
  ],
  imports: [
    InlineSVGModule,
    SharedModule,
    CommonModule,
    RolesPermissionRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RolesPermissionModule { }
