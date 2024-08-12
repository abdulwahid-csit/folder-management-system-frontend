import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationRoutingModule } from './organization-routing.module';
import { CreateOrganizationComponent } from './components/create-organization/create-organization.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { OrganizationComponent } from './components/organization/organization.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrganizationDetailsComponent } from './components/organization-details/organization-details.component';


@NgModule({
  declarations: [
    CreateOrganizationComponent,
    OrganizationComponent,
    OrganizationDetailsComponent
  ],
  imports: [
    CommonModule,
    OrganizationRoutingModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ]
})
export class SsoAdminModule { }
