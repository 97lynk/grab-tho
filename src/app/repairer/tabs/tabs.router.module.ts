import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          { path: '', loadChildren: '../home/home.module#HomeModule' }
        ]
      },
      {
        path: 'jobs',
        children: [
          { path: '', loadChildren: '../jobs/jobs.module#JobsPageModule' }
        ]
      },
      {
        path: 'notification',
        children: [
          { path: '', loadChildren: '../../notification/notification.module#NotificationPageModule' }
        ]
      },
      {
        path: 'tab3',
        children: [
          { path: '', loadChildren: '../../client/tab3/tab3.module#Tab3PageModule' }
        ]
      },
      {
        path: '',
        redirectTo: '/r/tabs/home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
