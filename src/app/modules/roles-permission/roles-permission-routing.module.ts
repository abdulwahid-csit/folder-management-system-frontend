import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesPermissionListComponent } from './roles-permission-list/roles-permission-list.component';
import { CreateRoleComponent } from './create-role/create-role.component';
import { RoleDetailComponent } from './role-detail/role-detail.component';
import { NotFoundComponent } from 'src/app/shared/components/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: RolesPermissionListComponent },
   {
    path: 'permissionUserDetail',
    component: CreateRoleComponent
  },
  {
    path: 'details/:id',
  component: RoleDetailComponent
  },
  {
    path:'**', component:NotFoundComponent
  },
   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesPermissionRoutingModule { }
