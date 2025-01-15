import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
// import { InlineSVGModule } from 'ng-inline-svg';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { FormsModule } from '@angular/forms'
import { NgSelectModule } from '@ng-select/ng-select';
import { CreateFolderComponent } from './create-folder/create-folder.component';
import { FolderDetailsComponent } from './folder-details/folder-details.component';
import { AddFileComponent } from './add-file/add-file.component';
import { FilesDetailsComponent } from './files-details/files-details.component';




@NgModule({
  declarations: [
    UserListComponent,
    UserDetailComponent,
    CreateFolderComponent,
    FolderDetailsComponent,
    AddFileComponent,
    FilesDetailsComponent
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
