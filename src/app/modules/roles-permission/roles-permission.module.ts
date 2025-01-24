import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RolesPermissionRoutingModule } from './roles-permission-routing.module';
import { RolesPermissionListComponent } from './roles-permission-list/roles-permission-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'
import { NgSelectModule } from '@ng-select/ng-select';
import { FypDetailsComponent } from './fyp-details/fyp-details.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [RolesPermissionListComponent, FypDetailsComponent],
  imports: [
    SharedModule,
    CommonModule,
    RolesPermissionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
  ],
})
export class RolesPermissionModule {}
