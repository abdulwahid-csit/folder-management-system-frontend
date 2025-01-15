import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { profileRoutingModule } from './profile.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    profileRoutingModule,
    CommonModule, 
    FormsModule, ReactiveFormsModule
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }
