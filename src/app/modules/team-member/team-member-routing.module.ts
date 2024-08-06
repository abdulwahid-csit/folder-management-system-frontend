import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamMemberListComponent } from './team-member-list/team-member-list.component';
import { TeamMemberDetailComponent } from './team-member-detail/team-member-detail.component';

const routes: Routes = [
  {path:'',component:TeamMemberListComponent},
  {path:'team-member-detail/:id', component:TeamMemberDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamMemberRoutingModule { }
