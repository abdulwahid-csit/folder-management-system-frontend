import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { RegisterComponent } from './register/register.component';
import { CreatePasswordComponent } from './create-password/create-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


@NgModule({
  declarations: [
    SignInComponent,
    RegisterComponent,
    CreatePasswordComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule
  ],
  exports:[
    SignInComponent,
    RegisterComponent,
    CreatePasswordComponent,
    ForgotPasswordComponent
  ]
})
export class AuthenticationModule { }
