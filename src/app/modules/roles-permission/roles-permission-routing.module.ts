import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesPermissionListComponent } from './roles-permission-list/roles-permission-list.component';
import { NotFoundComponent } from 'src/app/shared/components/not-found/not-found.component';
import { FypDetailsComponent } from './fyp-details/fyp-details.component';

const routes: Routes = [
  { path: '', component: RolesPermissionListComponent },
  { path: 'details/:id', component: FypDetailsComponent },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesPermissionRoutingModule { }
