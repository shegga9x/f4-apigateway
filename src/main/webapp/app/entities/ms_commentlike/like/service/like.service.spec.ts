import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { ILike } from '../like.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../like.test-samples';

import { LikeService, RestLike } from './like.service';

const requireRestSample: RestLike = {
  ...sampleWithRequiredData,
  createdAt: sampleWithRequiredData.createdAt?.toJSON(),
};

describe('Like Service', () => {
  let service: LikeService;
  let httpMock: HttpTestingController;
  let expectedResult: ILike | ILike[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(LikeService);
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

    it('should create a Like', () => {
      const like = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(like).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Like', () => {
      const like = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(like).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Like', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Like', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Like', () => {
      const expected = true;

      service.delete('9fec3727-3421-4967-b213-ba36557ca194').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addLikeToCollectionIfMissing', () => {
      it('should add a Like to an empty array', () => {
        const like: ILike = sampleWithRequiredData;
        expectedResult = service.addLikeToCollectionIfMissing([], like);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(like);
      });

      it('should not add a Like to an array that contains it', () => {
        const like: ILike = sampleWithRequiredData;
        const likeCollection: ILike[] = [
          {
            ...like,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addLikeToCollectionIfMissing(likeCollection, like);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Like to an array that doesn't contain it", () => {
        const like: ILike = sampleWithRequiredData;
        const likeCollection: ILike[] = [sampleWithPartialData];
        expectedResult = service.addLikeToCollectionIfMissing(likeCollection, like);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(like);
      });

      it('should add only unique Like to an array', () => {
        const likeArray: ILike[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const likeCollection: ILike[] = [sampleWithRequiredData];
        expectedResult = service.addLikeToCollectionIfMissing(likeCollection, ...likeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const like: ILike = sampleWithRequiredData;
        const like2: ILike = sampleWithPartialData;
        expectedResult = service.addLikeToCollectionIfMissing([], like, like2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(like);
        expect(expectedResult).toContain(like2);
      });

      it('should accept null and undefined values', () => {
        const like: ILike = sampleWithRequiredData;
        expectedResult = service.addLikeToCollectionIfMissing([], null, like, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(like);
      });

      it('should return initial array if no Like is added', () => {
        const likeCollection: ILike[] = [sampleWithRequiredData];
        expectedResult = service.addLikeToCollectionIfMissing(likeCollection, undefined, null);
        expect(expectedResult).toEqual(likeCollection);
      });
    });

    describe('compareLike', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareLike(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: 'b8baf884-7c93-4f07-a4cc-a45a939df15b' };
        const entity2 = null;

        const compareResult1 = service.compareLike(entity1, entity2);
        const compareResult2 = service.compareLike(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: 'b8baf884-7c93-4f07-a4cc-a45a939df15b' };
        const entity2 = { id: '0e3fb7f6-934c-459f-97d0-fe1cee3c7d2d' };

        const compareResult1 = service.compareLike(entity1, entity2);
        const compareResult2 = service.compareLike(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: 'b8baf884-7c93-4f07-a4cc-a45a939df15b' };
        const entity2 = { id: 'b8baf884-7c93-4f07-a4cc-a45a939df15b' };

        const compareResult1 = service.compareLike(entity1, entity2);
        const compareResult2 = service.compareLike(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
