import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreatePasswordComponent } from './create-password/create-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegisterComponent } from './register/register.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { RegisterMemberComponent } from '../team-member/register-member/register-member.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: "login",
    component: SignInComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "create/password",
    component: CreatePasswordComponent
  },
  {
    path: "forgot/password",
    component: ForgotPasswordComponent
  },
  { path: 'confirm/:id',
    component: RegisterMemberComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
