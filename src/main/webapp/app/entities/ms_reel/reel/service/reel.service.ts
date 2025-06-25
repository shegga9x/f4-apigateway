import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, asapScheduler, map, scheduled } from 'rxjs';

import { catchError } from 'rxjs/operators';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IReel, NewReel } from '../reel.model';

export type PartialUpdateReel = Partial<IReel> & Pick<IReel, 'id'>;

type RestOf<T extends IReel | NewReel> = Omit<T, 'createdAt'> & {
  createdAt?: string | null;
};

export type RestReel = RestOf<IReel>;

export type NewRestReel = RestOf<NewReel>;

export type PartialUpdateRestReel = RestOf<PartialUpdateReel>;

export type EntityResponseType = HttpResponse<IReel>;
export type EntityArrayResponseType = HttpResponse<IReel[]>;

@Injectable({ providedIn: 'root' })
export class ReelService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/reels', 'msreel');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/reels/_search', 'msreel');

  create(reel: NewReel): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reel);
    return this.http.post<RestReel>(this.resourceUrl, copy, { observe: 'response' }).pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(reel: IReel): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reel);
    return this.http
      .put<RestReel>(`${this.resourceUrl}/${this.getReelIdentifier(reel)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(reel: PartialUpdateReel): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reel);
    return this.http
      .patch<RestReel>(`${this.resourceUrl}/${this.getReelIdentifier(reel)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<RestReel>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestReel[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<RestReel[]>(this.resourceSearchUrl, { params: options, observe: 'response' }).pipe(
      map(res => this.convertResponseArrayFromServer(res)),

      catchError(() => scheduled([new HttpResponse<IReel[]>()], asapScheduler)),
    );
  }

  getReelIdentifier(reel: Pick<IReel, 'id'>): string {
    return reel.id;
  }

  compareReel(o1: Pick<IReel, 'id'> | null, o2: Pick<IReel, 'id'> | null): boolean {
    return o1 && o2 ? this.getReelIdentifier(o1) === this.getReelIdentifier(o2) : o1 === o2;
  }

  addReelToCollectionIfMissing<Type extends Pick<IReel, 'id'>>(
    reelCollection: Type[],
    ...reelsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const reels: Type[] = reelsToCheck.filter(isPresent);
    if (reels.length > 0) {
      const reelCollectionIdentifiers = reelCollection.map(reelItem => this.getReelIdentifier(reelItem));
      const reelsToAdd = reels.filter(reelItem => {
        const reelIdentifier = this.getReelIdentifier(reelItem);
        if (reelCollectionIdentifiers.includes(reelIdentifier)) {
          return false;
        }
        reelCollectionIdentifiers.push(reelIdentifier);
        return true;
      });
      return [...reelsToAdd, ...reelCollection];
    }
    return reelCollection;
  }

  protected convertDateFromClient<T extends IReel | NewReel | PartialUpdateReel>(reel: T): RestOf<T> {
    return {
      ...reel,
      createdAt: reel.createdAt?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restReel: RestReel): IReel {
    return {
      ...restReel,
      createdAt: restReel.createdAt ? dayjs(restReel.createdAt) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestReel>): HttpResponse<IReel> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestReel[]>): HttpResponse<IReel[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
