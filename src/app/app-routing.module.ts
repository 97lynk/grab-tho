import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './util/auth-guard';

const routes: Routes = [
  {
    path: 'tabs',
    canActivate: [AuthGuard],
    loadChildren: () => import('./client/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'requests',
    canActivate: [AuthGuard],
    loadChildren: () => import('./client/add-request/add-request.module').then(m => m.AddRequestModule)
  },
  {
    path: 'requests/:requestId',
    canActivate: [AuthGuard],
    loadChildren: () => import('./client/request-detail/request-detail.module').then(m => m.RequestDetailModule)
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginPageModule'
  },
  {
    path: 'r/tabs',
    canActivate: [AuthGuard],
    loadChildren: './repairer/tabs/tabs.module#TabsPageModule'
  },
  {
    path: 'r/requests/:requestId',
    canActivate: [AuthGuard],
    loadChildren: './repairer/request-detail/request-detail.module#RequestDetailPageModule'
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: 'request-detail', loadChildren: './repairer/request-detail/request-detail.module#RequestDetailPageModule' },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
