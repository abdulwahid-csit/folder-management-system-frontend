import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ToastrModule} from 'ngx-toastr';

import { CreatePasswordComponent } from './create-password/create-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegisterComponent } from './register/register.component';
import { SignInComponent } from './sign-in/sign-in.component';


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
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-top-right'
    })
  ],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
