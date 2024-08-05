import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamMemberRoutingModule } from './team-member-routing.module';
import { InviteMemberComponent } from './invite-member/invite-member.component';
import { TeamMemberListComponent } from './team-member-list/team-member-list.component';
import { TeamMemberDetailComponent } from './team-member-detail/team-member-detail.component';
import { RegisterMemberComponent } from './register-member/register-member.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg';
import { UpdateTeamMemberComponent } from './update-team-member/update-team-member.component';


@NgModule({
  declarations: [
    InviteMemberComponent,
    TeamMemberListComponent,
    TeamMemberDetailComponent,
    RegisterMemberComponent,
    UpdateTeamMemberComponent
  ],
  imports: [
    CommonModule,
    TeamMemberRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
  ]
})
export class TeamMemberModule { }
