import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IReel } from '../reel.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../reel.test-samples';

import { ReelService, RestReel } from './reel.service';

const requireRestSample: RestReel = {
  ...sampleWithRequiredData,
  createdAt: sampleWithRequiredData.createdAt?.toJSON(),
};

describe('Reel Service', () => {
  let service: ReelService;
  let httpMock: HttpTestingController;
  let expectedResult: IReel | IReel[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(ReelService);
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

    it('should create a Reel', () => {
      const reel = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(reel).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Reel', () => {
      const reel = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(reel).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Reel', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Reel', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Reel', () => {
      const expected = true;

      service.delete('9fec3727-3421-4967-b213-ba36557ca194').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    it('should handle exceptions for searching a Reel', () => {
      const queryObject: any = {
        page: 0,
        size: 20,
        query: '',
        sort: [],
      };
      service.search(queryObject).subscribe(() => expectedResult);

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(null, { status: 500, statusText: 'Internal Server Error' });
      expect(expectedResult).toBe(null);
    });

    describe('addReelToCollectionIfMissing', () => {
      it('should add a Reel to an empty array', () => {
        const reel: IReel = sampleWithRequiredData;
        expectedResult = service.addReelToCollectionIfMissing([], reel);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(reel);
      });

      it('should not add a Reel to an array that contains it', () => {
        const reel: IReel = sampleWithRequiredData;
        const reelCollection: IReel[] = [
          {
            ...reel,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addReelToCollectionIfMissing(reelCollection, reel);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Reel to an array that doesn't contain it", () => {
        const reel: IReel = sampleWithRequiredData;
        const reelCollection: IReel[] = [sampleWithPartialData];
        expectedResult = service.addReelToCollectionIfMissing(reelCollection, reel);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(reel);
      });

      it('should add only unique Reel to an array', () => {
        const reelArray: IReel[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const reelCollection: IReel[] = [sampleWithRequiredData];
        expectedResult = service.addReelToCollectionIfMissing(reelCollection, ...reelArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const reel: IReel = sampleWithRequiredData;
        const reel2: IReel = sampleWithPartialData;
        expectedResult = service.addReelToCollectionIfMissing([], reel, reel2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(reel);
        expect(expectedResult).toContain(reel2);
      });

      it('should accept null and undefined values', () => {
        const reel: IReel = sampleWithRequiredData;
        expectedResult = service.addReelToCollectionIfMissing([], null, reel, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(reel);
      });

      it('should return initial array if no Reel is added', () => {
        const reelCollection: IReel[] = [sampleWithRequiredData];
        expectedResult = service.addReelToCollectionIfMissing(reelCollection, undefined, null);
        expect(expectedResult).toEqual(reelCollection);
      });
    });

    describe('compareReel', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareReel(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: '457e621a-61d9-4220-a9c4-ccccdfb83cee' };
        const entity2 = null;

        const compareResult1 = service.compareReel(entity1, entity2);
        const compareResult2 = service.compareReel(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: '457e621a-61d9-4220-a9c4-ccccdfb83cee' };
        const entity2 = { id: '3dc17a2a-b5c4-4796-bfeb-262e1f0d159e' };

        const compareResult1 = service.compareReel(entity1, entity2);
        const compareResult2 = service.compareReel(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: '457e621a-61d9-4220-a9c4-ccccdfb83cee' };
        const entity2 = { id: '457e621a-61d9-4220-a9c4-ccccdfb83cee' };

        const compareResult1 = service.compareReel(entity1, entity2);
        const compareResult2 = service.compareReel(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
