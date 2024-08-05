import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesPermissionListComponent } from './roles-permission-list/roles-permission-list.component';

const routes: Routes = [
  {path:'', component:RolesPermissionListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesPermissionRoutingModule { }
