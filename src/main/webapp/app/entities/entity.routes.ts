import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'user',
    data: { pageTitle: 'gatewayApp.msUserUser.home.title' },
    loadChildren: () => import('./ms_user/user/user.routes'),
  },
  {
    path: 'keycloak-user',
    data: { pageTitle: 'gatewayApp.msUserKeycloakUser.home.title' },
    loadChildren: () => import('./ms_user/keycloak-user/keycloak-user.routes'),
  },
  {
    path: 'reel',
    data: { pageTitle: 'gatewayApp.msReelReel.home.title' },
    loadChildren: () => import('./ms_reel/reel/reel.routes'),
  },
  {
    path: 'comment',
    data: { pageTitle: 'gatewayApp.msCommentlikeComment.home.title' },
    loadChildren: () => import('./ms_commentlike/comment/comment.routes'),
  },
  {
    path: 'like',
    data: { pageTitle: 'gatewayApp.msCommentlikeLike.home.title' },
    loadChildren: () => import('./ms_commentlike/like/like.routes'),
  },
  {
    path: 'notification',
    data: { pageTitle: 'gatewayApp.msNotificationNotification.home.title' },
    loadChildren: () => import('./ms_notification/notification/notification.routes'),
  },
  {
    path: 'feed-item',
    data: { pageTitle: 'gatewayApp.msFeedFeedItem.home.title' },
    loadChildren: () => import('./ms_feed/feed-item/feed-item.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
