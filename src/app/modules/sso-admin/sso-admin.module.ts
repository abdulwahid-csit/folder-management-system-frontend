import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SsoAdminRoutingModule } from './sso-admin-routing.module';
import { CreateOrganizationComponent } from './components/create-organization/create-organization.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreateOrganizationComponent
  ],
  imports: [
    CommonModule,
    SsoAdminRoutingModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SsoAdminModule { }
