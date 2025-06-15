import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import FeedItemResolve from './route/feed-item-routing-resolve.service';

const feedItemRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/feed-item.component').then(m => m.FeedItemComponent),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/feed-item-detail.component').then(m => m.FeedItemDetailComponent),
    resolve: {
      feedItem: FeedItemResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/feed-item-update.component').then(m => m.FeedItemUpdateComponent),
    resolve: {
      feedItem: FeedItemResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/feed-item-update.component').then(m => m.FeedItemUpdateComponent),
    resolve: {
      feedItem: FeedItemResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default feedItemRoute;
