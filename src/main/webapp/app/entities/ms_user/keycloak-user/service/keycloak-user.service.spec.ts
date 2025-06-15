import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IKeycloakUser } from '../keycloak-user.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../keycloak-user.test-samples';

import { KeycloakUserService } from './keycloak-user.service';

const requireRestSample: IKeycloakUser = {
  ...sampleWithRequiredData,
};

describe('KeycloakUser Service', () => {
  let service: KeycloakUserService;
  let httpMock: HttpTestingController;
  let expectedResult: IKeycloakUser | IKeycloakUser[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(KeycloakUserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find('9fec3727-3421-4967-b213-ba36557ca194').subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a KeycloakUser', () => {
      const keycloakUser = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(keycloakUser).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a KeycloakUser', () => {
      const keycloakUser = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(keycloakUser).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a KeycloakUser', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of KeycloakUser', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a KeycloakUser', () => {
      const expected = true;

      service.delete('9fec3727-3421-4967-b213-ba36557ca194').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addKeycloakUserToCollectionIfMissing', () => {
      it('should add a KeycloakUser to an empty array', () => {
        const keycloakUser: IKeycloakUser = sampleWithRequiredData;
        expectedResult = service.addKeycloakUserToCollectionIfMissing([], keycloakUser);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(keycloakUser);
      });

      it('should not add a KeycloakUser to an array that contains it', () => {
        const keycloakUser: IKeycloakUser = sampleWithRequiredData;
        const keycloakUserCollection: IKeycloakUser[] = [
          {
            ...keycloakUser,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addKeycloakUserToCollectionIfMissing(keycloakUserCollection, keycloakUser);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a KeycloakUser to an array that doesn't contain it", () => {
        const keycloakUser: IKeycloakUser = sampleWithRequiredData;
        const keycloakUserCollection: IKeycloakUser[] = [sampleWithPartialData];
        expectedResult = service.addKeycloakUserToCollectionIfMissing(keycloakUserCollection, keycloakUser);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(keycloakUser);
      });

      it('should add only unique KeycloakUser to an array', () => {
        const keycloakUserArray: IKeycloakUser[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const keycloakUserCollection: IKeycloakUser[] = [sampleWithRequiredData];
        expectedResult = service.addKeycloakUserToCollectionIfMissing(keycloakUserCollection, ...keycloakUserArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const keycloakUser: IKeycloakUser = sampleWithRequiredData;
        const keycloakUser2: IKeycloakUser = sampleWithPartialData;
        expectedResult = service.addKeycloakUserToCollectionIfMissing([], keycloakUser, keycloakUser2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(keycloakUser);
        expect(expectedResult).toContain(keycloakUser2);
      });

      it('should accept null and undefined values', () => {
        const keycloakUser: IKeycloakUser = sampleWithRequiredData;
        expectedResult = service.addKeycloakUserToCollectionIfMissing([], null, keycloakUser, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(keycloakUser);
      });

      it('should return initial array if no KeycloakUser is added', () => {
        const keycloakUserCollection: IKeycloakUser[] = [sampleWithRequiredData];
        expectedResult = service.addKeycloakUserToCollectionIfMissing(keycloakUserCollection, undefined, null);
        expect(expectedResult).toEqual(keycloakUserCollection);
      });
    });

    describe('compareKeycloakUser', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareKeycloakUser(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: '9aecda41-0e2d-4fef-bdf5-5630ce63b8a9' };
        const entity2 = null;

        const compareResult1 = service.compareKeycloakUser(entity1, entity2);
        const compareResult2 = service.compareKeycloakUser(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: '9aecda41-0e2d-4fef-bdf5-5630ce63b8a9' };
        const entity2 = { id: 'bc1b373a-136f-4ab8-a255-2d4a5f60fe29' };

        const compareResult1 = service.compareKeycloakUser(entity1, entity2);
        const compareResult2 = service.compareKeycloakUser(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: '9aecda41-0e2d-4fef-bdf5-5630ce63b8a9' };
        const entity2 = { id: '9aecda41-0e2d-4fef-bdf5-5630ce63b8a9' };

        const compareResult1 = service.compareKeycloakUser(entity1, entity2);
        const compareResult2 = service.compareKeycloakUser(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
