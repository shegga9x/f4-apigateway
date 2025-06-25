import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ILike, NewLike } from '../like.model';

export type PartialUpdateLike = Partial<ILike> & Pick<ILike, 'id'>;

type RestOf<T extends ILike | NewLike> = Omit<T, 'createdAt'> & {
  createdAt?: string | null;
};

export type RestLike = RestOf<ILike>;

export type NewRestLike = RestOf<NewLike>;

export type PartialUpdateRestLike = RestOf<PartialUpdateLike>;

export type EntityResponseType = HttpResponse<ILike>;
export type EntityArrayResponseType = HttpResponse<ILike[]>;

@Injectable({ providedIn: 'root' })
export class LikeService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/likes', 'ms_commentlike');

  create(like: NewLike): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(like);
    return this.http.post<RestLike>(this.resourceUrl, copy, { observe: 'response' }).pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(like: ILike): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(like);
    return this.http
      .put<RestLike>(`${this.resourceUrl}/${this.getLikeIdentifier(like)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(like: PartialUpdateLike): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(like);
    return this.http
      .patch<RestLike>(`${this.resourceUrl}/${this.getLikeIdentifier(like)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<RestLike>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestLike[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getLikeIdentifier(like: Pick<ILike, 'id'>): string {
    return like.id;
  }

  compareLike(o1: Pick<ILike, 'id'> | null, o2: Pick<ILike, 'id'> | null): boolean {
    return o1 && o2 ? this.getLikeIdentifier(o1) === this.getLikeIdentifier(o2) : o1 === o2;
  }

  addLikeToCollectionIfMissing<Type extends Pick<ILike, 'id'>>(
    likeCollection: Type[],
    ...likesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const likes: Type[] = likesToCheck.filter(isPresent);
    if (likes.length > 0) {
      const likeCollectionIdentifiers = likeCollection.map(likeItem => this.getLikeIdentifier(likeItem));
      const likesToAdd = likes.filter(likeItem => {
        const likeIdentifier = this.getLikeIdentifier(likeItem);
        if (likeCollectionIdentifiers.includes(likeIdentifier)) {
          return false;
        }
        likeCollectionIdentifiers.push(likeIdentifier);
        return true;
      });
      return [...likesToAdd, ...likeCollection];
    }
    return likeCollection;
  }

  protected convertDateFromClient<T extends ILike | NewLike | PartialUpdateLike>(like: T): RestOf<T> {
    return {
      ...like,
      createdAt: like.createdAt?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restLike: RestLike): ILike {
    return {
      ...restLike,
      createdAt: restLike.createdAt ? dayjs(restLike.createdAt) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestLike>): HttpResponse<ILike> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestLike[]>): HttpResponse<ILike[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
