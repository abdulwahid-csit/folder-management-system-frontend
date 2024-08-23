import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { RegisterComponent } from './register/register.component';
import { CreatePasswordComponent } from './create-password/create-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RegisterMemberComponent } from '../team-member/register-member/register-member.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { VerifyEmailComponent } from './verify-otp/verify-email.component';


@NgModule({
  declarations: [
    SignInComponent,
    RegisterComponent,
    CreatePasswordComponent,
    ForgotPasswordComponent,
    RegisterMemberComponent,
    VerifyEmailComponent,
    
  ],
  imports: [
    RouterModule,
    CommonModule,
    SharedModule,
    AuthenticationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  exports:[
    SignInComponent,
    RegisterComponent,
    CreatePasswordComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent
  ]
})
export class AuthenticationModule { }
