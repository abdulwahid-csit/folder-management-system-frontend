import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { CreateUserComponent } from './create-user/create-user.component';
// import { InlineSVGModule } from 'ng-inline-svg';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { FormsModule } from '@angular/forms'
import { NgSelectModule } from '@ng-select/ng-select';




@NgModule({
  declarations: [
    UserListComponent,
    CreateUserComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    // InlineSVGModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule
  ]

})
export class UserModule { }
