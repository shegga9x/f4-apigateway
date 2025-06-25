import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, asapScheduler, map, scheduled } from 'rxjs';

import { catchError } from 'rxjs/operators';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IFeedItem, NewFeedItem } from '../feed-item.model';

export type PartialUpdateFeedItem = Partial<IFeedItem> & Pick<IFeedItem, 'id'>;

type RestOf<T extends IFeedItem | NewFeedItem> = Omit<T, 'createdAt' | 'updatedAt'> & {
  createdAt?: string | null;
  updatedAt?: string | null;
};

export type RestFeedItem = RestOf<IFeedItem>;

export type NewRestFeedItem = RestOf<NewFeedItem>;

export type PartialUpdateRestFeedItem = RestOf<PartialUpdateFeedItem>;

export type EntityResponseType = HttpResponse<IFeedItem>;
export type EntityArrayResponseType = HttpResponse<IFeedItem[]>;

@Injectable({ providedIn: 'root' })
export class FeedItemService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/feed-items', 'msfeed');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/feed-items/_search', 'msfeed');

  create(feedItem: NewFeedItem): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(feedItem);
    return this.http
      .post<RestFeedItem>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(feedItem: IFeedItem): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(feedItem);
    return this.http
      .put<RestFeedItem>(`${this.resourceUrl}/${this.getFeedItemIdentifier(feedItem)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(feedItem: PartialUpdateFeedItem): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(feedItem);
    return this.http
      .patch<RestFeedItem>(`${this.resourceUrl}/${this.getFeedItemIdentifier(feedItem)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<RestFeedItem>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestFeedItem[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<RestFeedItem[]>(this.resourceSearchUrl, { params: options, observe: 'response' }).pipe(
      map(res => this.convertResponseArrayFromServer(res)),

      catchError(() => scheduled([new HttpResponse<IFeedItem[]>()], asapScheduler)),
    );
  }

  getFeedItemIdentifier(feedItem: Pick<IFeedItem, 'id'>): string {
    return feedItem.id;
  }

  compareFeedItem(o1: Pick<IFeedItem, 'id'> | null, o2: Pick<IFeedItem, 'id'> | null): boolean {
    return o1 && o2 ? this.getFeedItemIdentifier(o1) === this.getFeedItemIdentifier(o2) : o1 === o2;
  }

  addFeedItemToCollectionIfMissing<Type extends Pick<IFeedItem, 'id'>>(
    feedItemCollection: Type[],
    ...feedItemsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const feedItems: Type[] = feedItemsToCheck.filter(isPresent);
    if (feedItems.length > 0) {
      const feedItemCollectionIdentifiers = feedItemCollection.map(feedItemItem => this.getFeedItemIdentifier(feedItemItem));
      const feedItemsToAdd = feedItems.filter(feedItemItem => {
        const feedItemIdentifier = this.getFeedItemIdentifier(feedItemItem);
        if (feedItemCollectionIdentifiers.includes(feedItemIdentifier)) {
          return false;
        }
        feedItemCollectionIdentifiers.push(feedItemIdentifier);
        return true;
      });
      return [...feedItemsToAdd, ...feedItemCollection];
    }
    return feedItemCollection;
  }

  protected convertDateFromClient<T extends IFeedItem | NewFeedItem | PartialUpdateFeedItem>(feedItem: T): RestOf<T> {
    return {
      ...feedItem,
      createdAt: feedItem.createdAt?.toJSON() ?? null,
      updatedAt: feedItem.updatedAt?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restFeedItem: RestFeedItem): IFeedItem {
    return {
      ...restFeedItem,
      createdAt: restFeedItem.createdAt ? dayjs(restFeedItem.createdAt) : undefined,
      updatedAt: restFeedItem.updatedAt ? dayjs(restFeedItem.updatedAt) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestFeedItem>): HttpResponse<IFeedItem> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestFeedItem[]>): HttpResponse<IFeedItem[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
