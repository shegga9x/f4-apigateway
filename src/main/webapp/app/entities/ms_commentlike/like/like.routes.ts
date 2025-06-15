import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import LikeResolve from './route/like-routing-resolve.service';

const likeRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/like.component').then(m => m.LikeComponent),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/like-detail.component').then(m => m.LikeDetailComponent),
    resolve: {
      like: LikeResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/like-update.component').then(m => m.LikeUpdateComponent),
    resolve: {
      like: LikeResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/like-update.component').then(m => m.LikeUpdateComponent),
    resolve: {
      like: LikeResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default likeRoute;
