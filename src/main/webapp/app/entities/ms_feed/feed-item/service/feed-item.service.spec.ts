import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IFeedItem } from '../feed-item.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../feed-item.test-samples';

import { FeedItemService, RestFeedItem } from './feed-item.service';

const requireRestSample: RestFeedItem = {
  ...sampleWithRequiredData,
  timestamp: sampleWithRequiredData.timestamp?.toJSON(),
};

describe('FeedItem Service', () => {
  let service: FeedItemService;
  let httpMock: HttpTestingController;
  let expectedResult: IFeedItem | IFeedItem[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(FeedItemService);
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

    it('should create a FeedItem', () => {
      const feedItem = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(feedItem).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a FeedItem', () => {
      const feedItem = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(feedItem).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a FeedItem', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of FeedItem', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a FeedItem', () => {
      const expected = true;

      service.delete('9fec3727-3421-4967-b213-ba36557ca194').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    it('should handle exceptions for searching a FeedItem', () => {
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

    describe('addFeedItemToCollectionIfMissing', () => {
      it('should add a FeedItem to an empty array', () => {
        const feedItem: IFeedItem = sampleWithRequiredData;
        expectedResult = service.addFeedItemToCollectionIfMissing([], feedItem);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(feedItem);
      });

      it('should not add a FeedItem to an array that contains it', () => {
        const feedItem: IFeedItem = sampleWithRequiredData;
        const feedItemCollection: IFeedItem[] = [
          {
            ...feedItem,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addFeedItemToCollectionIfMissing(feedItemCollection, feedItem);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a FeedItem to an array that doesn't contain it", () => {
        const feedItem: IFeedItem = sampleWithRequiredData;
        const feedItemCollection: IFeedItem[] = [sampleWithPartialData];
        expectedResult = service.addFeedItemToCollectionIfMissing(feedItemCollection, feedItem);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(feedItem);
      });

      it('should add only unique FeedItem to an array', () => {
        const feedItemArray: IFeedItem[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const feedItemCollection: IFeedItem[] = [sampleWithRequiredData];
        expectedResult = service.addFeedItemToCollectionIfMissing(feedItemCollection, ...feedItemArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const feedItem: IFeedItem = sampleWithRequiredData;
        const feedItem2: IFeedItem = sampleWithPartialData;
        expectedResult = service.addFeedItemToCollectionIfMissing([], feedItem, feedItem2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(feedItem);
        expect(expectedResult).toContain(feedItem2);
      });

      it('should accept null and undefined values', () => {
        const feedItem: IFeedItem = sampleWithRequiredData;
        expectedResult = service.addFeedItemToCollectionIfMissing([], null, feedItem, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(feedItem);
      });

      it('should return initial array if no FeedItem is added', () => {
        const feedItemCollection: IFeedItem[] = [sampleWithRequiredData];
        expectedResult = service.addFeedItemToCollectionIfMissing(feedItemCollection, undefined, null);
        expect(expectedResult).toEqual(feedItemCollection);
      });
    });

    describe('compareFeedItem', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareFeedItem(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: 'a0f45389-7f4f-49db-83df-ff9f91ed4a23' };
        const entity2 = null;

        const compareResult1 = service.compareFeedItem(entity1, entity2);
        const compareResult2 = service.compareFeedItem(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: 'a0f45389-7f4f-49db-83df-ff9f91ed4a23' };
        const entity2 = { id: 'eb2cc268-70b2-483e-8f88-e7e151e50605' };

        const compareResult1 = service.compareFeedItem(entity1, entity2);
        const compareResult2 = service.compareFeedItem(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: 'a0f45389-7f4f-49db-83df-ff9f91ed4a23' };
        const entity2 = { id: 'a0f45389-7f4f-49db-83df-ff9f91ed4a23' };

        const compareResult1 = service.compareFeedItem(entity1, entity2);
        const compareResult2 = service.compareFeedItem(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
