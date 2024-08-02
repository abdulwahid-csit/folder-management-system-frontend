import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {path:'',component:LayoutComponent, children: [
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full'
    },
    {
      path: 'dashboard',
      loadChildren: () => import('../modules/dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
      path: 'organization',
      loadChildren: () => import('../modules/organization/organization.module').then(m => m.SsoAdminModule)
    },
    {
      path: 'user',
      loadChildren: () => import('../modules/user/user.module').then(m => m.UserModule)
    },
    {
      path: 'application',
      loadChildren: () => import('../modules/application/application.module').then(m => m.ApplicationModule)
    }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
