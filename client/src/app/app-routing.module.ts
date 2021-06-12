import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/shared/guards/auth.guard';

import { AuthLayoutComponent, SiteLayoutComponent } from '@app/shared/layouts';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
      },
    ]
  },
  {
    path: '',
    component: SiteLayoutComponent,
    canActivate: [ AuthGuard ],
    children: [
      {
        path: 'overview',
        loadChildren: () => import('./overview/overview.module').then(m => m.OverviewModule)
      },
      {
        path: 'analytics',
        loadChildren: () => import('./analytics/analytics.module').then(m => m.AnalyticsModule)
      },
      {
        path: 'history',
        loadChildren: () => import('./history/history.module').then(m => m.HistoryModule)
      },
      {
        path: 'order',
        loadChildren: () => import('./order/order.module').then(m => m.OrderModule)
      },
      {
        path: 'categories',
        loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule)
      },
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
