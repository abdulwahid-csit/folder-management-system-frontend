import { NgModule } from '@angular/core';
import { RouterModule ,Routes} from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { NotFoundComponent } from 'src/app/shared/components/not-found/not-found.component';
import { FolderDetailsComponent } from './folder-details/folder-details.component';
import { FilesDetailsComponent } from './files-details/files-details.component';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
  },
  {
    path: 'details/:id',
    component: FolderDetailsComponent,
  },
  {
    path: 'file-details',
    component: FilesDetailsComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
