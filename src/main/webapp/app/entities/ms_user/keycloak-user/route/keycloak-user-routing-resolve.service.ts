import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IKeycloakUser } from '../keycloak-user.model';
import { KeycloakUserService } from '../service/keycloak-user.service';

const keycloakUserResolve = (route: ActivatedRouteSnapshot): Observable<null | IKeycloakUser> => {
  const id = route.params.id;
  if (id) {
    return inject(KeycloakUserService)
      .find(id)
      .pipe(
        mergeMap((keycloakUser: HttpResponse<IKeycloakUser>) => {
          if (keycloakUser.body) {
            return of(keycloakUser.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default keycloakUserResolve;
