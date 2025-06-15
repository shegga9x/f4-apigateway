import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import ReelResolve from './route/reel-routing-resolve.service';

const reelRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/reel.component').then(m => m.ReelComponent),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/reel-detail.component').then(m => m.ReelDetailComponent),
    resolve: {
      reel: ReelResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/reel-update.component').then(m => m.ReelUpdateComponent),
    resolve: {
      reel: ReelResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/reel-update.component').then(m => m.ReelUpdateComponent),
    resolve: {
      reel: ReelResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default reelRoute;
