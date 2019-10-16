import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { VDateTimePipe } from './pipe/vdate-time.pipe';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'requests',
    loadChildren: () => import('./add-request/add-request.module').then(m => m.AddRequestModule)
  },
  {
    path: 'requests/:requestId',
    loadChildren: () => import('./request-detail/request-detail.module').then(m => m.RequestDetailModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
