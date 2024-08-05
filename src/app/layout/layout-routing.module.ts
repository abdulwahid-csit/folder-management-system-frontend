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
    },
    {
      path:'roles',
      loadChildren: ()=> import('../modules/roles-permission/roles-permission.module').then(m=> m.RolesPermissionModule)
    },
    {
      path:'team-member',
      loadChildren: ()=> import('../modules/team-member/team-member.module').then(m=> m.TeamMemberModule)
    }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
