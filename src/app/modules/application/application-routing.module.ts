import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationListComponent } from './application-list/application-list.component';
import { ApplicationDetailsComponent } from './application-details/application-details.component';

const routes: Routes = [
  {path:'', component:ApplicationListComponent},
  {path:'details', component:ApplicationDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
