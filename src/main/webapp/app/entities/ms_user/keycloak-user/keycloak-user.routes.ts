import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import KeycloakUserResolve from './route/keycloak-user-routing-resolve.service';

const keycloakUserRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/keycloak-user.component').then(m => m.KeycloakUserComponent),
    data: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/keycloak-user-detail.component').then(m => m.KeycloakUserDetailComponent),
    resolve: {
      keycloakUser: KeycloakUserResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/keycloak-user-update.component').then(m => m.KeycloakUserUpdateComponent),
    resolve: {
      keycloakUser: KeycloakUserResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/keycloak-user-update.component').then(m => m.KeycloakUserUpdateComponent),
    resolve: {
      keycloakUser: KeycloakUserResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default keycloakUserRoute;
