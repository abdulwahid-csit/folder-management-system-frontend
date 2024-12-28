import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
// import { RegisterMemberComponent } from './modules/team-member/register-member/register-member.component';

const routes: Routes = [
  {
    path: 'layout',
    canActivate:[authGuard],
    loadChildren: () =>
      import('./layout/layout.module').then((m) => m.LayoutModule),
  },
  { path: '',
     loadChildren: () =>
      import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path:'**', component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
