import { Routes, RouterModule } from '@angular/router';
import { FmsUsersComponent } from './fms-users.component';
import { NotFoundComponent } from 'src/app/shared/components/not-found/not-found.component';
import { RegisterNewUserComponent } from './register-new-user/register-new-user.component';

const routes: Routes = [
  { path: '', component: FmsUsersComponent },
  { path: 'register-new-user', component: RegisterNewUserComponent },
  {path: '**', component: NotFoundComponent}
];

export const FmsUserRoutes = RouterModule.forChild(routes);
