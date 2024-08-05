import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesPermissionRoutingModule } from './roles-permission-routing.module';
import { RolesPermissionListComponent } from './roles-permission-list/roles-permission-list.component';
import { CreateRoleComponent } from './create-role/create-role.component';
import { RoleDetailComponent } from './role-detail/role-detail.component';


@NgModule({
  declarations: [
    RolesPermissionListComponent,
    CreateRoleComponent,
    RoleDetailComponent
  ],
  imports: [
    CommonModule,
    RolesPermissionRoutingModule
  ]
})
export class RolesPermissionModule { }
