import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IFeedItem } from '../feed-item.model';
import { FeedItemService } from '../service/feed-item.service';

const feedItemResolve = (route: ActivatedRouteSnapshot): Observable<null | IFeedItem> => {
  const id = route.params.id;
  if (id) {
    return inject(FeedItemService)
      .find(id)
      .pipe(
        mergeMap((feedItem: HttpResponse<IFeedItem>) => {
          if (feedItem.body) {
            return of(feedItem.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default feedItemResolve;
