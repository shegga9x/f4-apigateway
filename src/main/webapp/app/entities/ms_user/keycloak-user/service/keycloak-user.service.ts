import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IKeycloakUser, NewKeycloakUser } from '../keycloak-user.model';

export type PartialUpdateKeycloakUser = Partial<IKeycloakUser> & Pick<IKeycloakUser, 'id'>;

export type EntityResponseType = HttpResponse<IKeycloakUser>;
export type EntityArrayResponseType = HttpResponse<IKeycloakUser[]>;

@Injectable({ providedIn: 'root' })
export class KeycloakUserService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/keycloak-users', 'ms_user');

  create(keycloakUser: NewKeycloakUser): Observable<EntityResponseType> {
    return this.http.post<IKeycloakUser>(this.resourceUrl, keycloakUser, { observe: 'response' });
  }

  update(keycloakUser: IKeycloakUser): Observable<EntityResponseType> {
    return this.http.put<IKeycloakUser>(`${this.resourceUrl}/${this.getKeycloakUserIdentifier(keycloakUser)}`, keycloakUser, {
      observe: 'response',
    });
  }

  partialUpdate(keycloakUser: PartialUpdateKeycloakUser): Observable<EntityResponseType> {
    return this.http.patch<IKeycloakUser>(`${this.resourceUrl}/${this.getKeycloakUserIdentifier(keycloakUser)}`, keycloakUser, {
      observe: 'response',
    });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IKeycloakUser>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IKeycloakUser[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getKeycloakUserIdentifier(keycloakUser: Pick<IKeycloakUser, 'id'>): string {
    return keycloakUser.id;
  }

  compareKeycloakUser(o1: Pick<IKeycloakUser, 'id'> | null, o2: Pick<IKeycloakUser, 'id'> | null): boolean {
    return o1 && o2 ? this.getKeycloakUserIdentifier(o1) === this.getKeycloakUserIdentifier(o2) : o1 === o2;
  }

  addKeycloakUserToCollectionIfMissing<Type extends Pick<IKeycloakUser, 'id'>>(
    keycloakUserCollection: Type[],
    ...keycloakUsersToCheck: (Type | null | undefined)[]
  ): Type[] {
    const keycloakUsers: Type[] = keycloakUsersToCheck.filter(isPresent);
    if (keycloakUsers.length > 0) {
      const keycloakUserCollectionIdentifiers = keycloakUserCollection.map(keycloakUserItem =>
        this.getKeycloakUserIdentifier(keycloakUserItem),
      );
      const keycloakUsersToAdd = keycloakUsers.filter(keycloakUserItem => {
        const keycloakUserIdentifier = this.getKeycloakUserIdentifier(keycloakUserItem);
        if (keycloakUserCollectionIdentifiers.includes(keycloakUserIdentifier)) {
          return false;
        }
        keycloakUserCollectionIdentifiers.push(keycloakUserIdentifier);
        return true;
      });
      return [...keycloakUsersToAdd, ...keycloakUserCollection];
    }
    return keycloakUserCollection;
  }
}
