import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { roleGuardChild } from '../guards/role.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,

    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../modules/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'organization',
        loadChildren: () =>
          import('../modules/organization/organization.module').then(
            (m) => m.SsoAdminModule
          ),
      },
      {
        path: 'folders',
        loadChildren: () =>
          import('../modules/user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'todo',
        loadChildren: () =>
          import('../modules/application/application.module').then(
            (m) => m.ApplicationModule
          ),
      },
      {
        path: 'fyp',
        loadChildren: () =>
          import('../modules/roles-permission/roles-permission.module').then(
            (m) => m.RolesPermissionModule
          ),
      },
      {
        path: 'about',
        loadChildren: () =>
          import('../modules/about/about.module').then((m) => m.AboutModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../modules/profile/profile.module').then(
            (m) => m.ProfileModule
          ),
      },
      {
        path: 'report',
        loadChildren: () =>
          import('../modules/report/report.module').then((m) => m.ReportModule),
      },
      {
        path: '**',
        redirectTo: 'dashboard',
      },
    ],
  },
];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
