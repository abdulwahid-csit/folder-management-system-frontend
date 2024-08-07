import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RolesPermissionRoutingModule } from './roles-permission-routing.module';
import { RolesPermissionListComponent } from './roles-permission-list/roles-permission-list.component';
import { CreateRoleComponent } from './create-role/create-role.component';
import { InlineSVGModule } from 'ng-inline-svg';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'
import { RoleDetailComponent } from './role-detail/role-detail.component';

@NgModule({
  declarations: [
    RolesPermissionListComponent,
    CreateRoleComponent,
    RoleDetailComponent
  
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
