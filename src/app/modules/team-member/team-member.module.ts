import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamMemberRoutingModule } from './team-member-routing.module';
import { TeamMemberListComponent } from './team-member-list/team-member-list.component';
// import { RegisterMemberComponent } from './register-member/register-member.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    TeamMemberListComponent,
    // RegisterMemberComponent,
  ],
  imports: [
    CommonModule,
    TeamMemberRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ]
})
export class TeamMemberModule { }
