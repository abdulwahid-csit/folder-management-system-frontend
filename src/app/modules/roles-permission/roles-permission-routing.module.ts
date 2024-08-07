import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesPermissionListComponent } from './roles-permission-list/roles-permission-list.component';
import { CreateRoleComponent } from './create-role/create-role.component';
import { RoleDetailComponent } from './role-detail/role-detail.component';

const routes: Routes = [
  { path: '', component: RolesPermissionListComponent },
   {
    path: 'permissionUserDetail',
    component: CreateRoleComponent
  },
  {
    path: 'role-detail/:id',
  component: RoleDetailComponent
  }
   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesPermissionRoutingModule { }
