import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationComponent } from './components/organization/organization.component';
import { OrganizationDetailsComponent } from './components/organization-details/organization-details.component';

const routes: Routes = [
  {path:'', component:OrganizationComponent},
  {path:'details/:id', component:OrganizationDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule { }
