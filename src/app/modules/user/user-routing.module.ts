import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule ,Routes} from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {
   path: 'user',
  component: UserListComponent
  }
 
  

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
