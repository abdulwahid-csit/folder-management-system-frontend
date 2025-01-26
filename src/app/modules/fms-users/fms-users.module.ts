import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FmsUsersComponent } from './fms-users.component';
import { FmsUserRoutes } from './fms-user.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterNewUserComponent } from './register-new-user/register-new-user.component';

@NgModule({
  imports: [
    CommonModule,
    FmsUserRoutes,
    FormsModule, 
    ReactiveFormsModule
  ],
  declarations: [FmsUsersComponent, RegisterNewUserComponent]
})
export class FmsUsersModule { }
