import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamMemberRoutingModule } from './team-member-routing.module';
import { InviteMemberComponent } from './invite-member/invite-member.component';
import { TeamMemberListComponent } from './team-member-list/team-member-list.component';
import { TeamMemberDetailComponent } from './team-member-detail/team-member-detail.component';
import { RegisterMemberComponent } from './register-member/register-member.component';


@NgModule({
  declarations: [
    InviteMemberComponent,
    TeamMemberListComponent,
    TeamMemberDetailComponent,
    RegisterMemberComponent
  ],
  imports: [
    CommonModule,
    TeamMemberRoutingModule
  ]
})
export class TeamMemberModule { }
