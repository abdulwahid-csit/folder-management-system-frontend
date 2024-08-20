import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { roleGuardChild } from '../guards/role.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    // canActivateChild: [roleGuardChild],
    // data: { expectedRoles: ['Master', 'Owner', 'Developer'] },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../modules/dashboard/dashboard.module').then(m => m.DashboardModule),
        // canActivate: [roleGuard],
        // data: { expectedRoles: ['Master', 'Owner', 'Developer'] }
      },
      {
        path: 'organization',
        loadChildren: () => import('../modules/organization/organization.module').then(m => m.SsoAdminModule),
        // canActivate: [roleGuard],
        // data: { expectedRoles: ['Master', 'Owner'] }
      },
      {
        path: 'user',
        loadChildren: () => import('../modules/user/user.module').then(m => m.UserModule),
        // canActivate: [roleGuard],
        // data: { expectedRoles: ['Master', 'Developer'] }
      },
      {
        path: 'application',
        loadChildren: () => import('../modules/application/application.module').then(m => m.ApplicationModule),
        // canActivate: [roleGuard],
        // data: { expectedRoles: ['Master', 'Developer'] }
      },
      {
        path: 'roles',
        loadChildren: () => import('../modules/roles-permission/roles-permission.module').then(m => m.RolesPermissionModule),
        // canActivate: [roleGuard],
        // data: { expectedRoles: ['Master'] }
      },
      {
        path: 'team-member',
        loadChildren: () => import('../modules/team-member/team-member.module').then(m => m.TeamMemberModule),
        // canActivate: [roleGuard],
        // data: { expectedRoles: ['Master'] }
      },
      {
        path: '**',
        redirectTo: 'dashboard'
      }
    ]
  },
  // { path: 'unauthorized', component: UnauthorizedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
