import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IReel } from '../reel.model';
import { ReelService } from '../service/reel.service';

const reelResolve = (route: ActivatedRouteSnapshot): Observable<null | IReel> => {
  const id = route.params.id;
  if (id) {
    return inject(ReelService)
      .find(id)
      .pipe(
        mergeMap((reel: HttpResponse<IReel>) => {
          if (reel.body) {
            return of(reel.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default reelResolve;
