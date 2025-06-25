import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../feed-item.test-samples';

import { FeedItemFormService } from './feed-item-form.service';

describe('FeedItem Form Service', () => {
  let service: FeedItemFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeedItemFormService);
  });

  describe('Service methods', () => {
    describe('createFeedItemFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createFeedItemFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            userId: expect.any(Object),
            content: expect.any(Object),
            imageUrl: expect.any(Object),
            videoUrl: expect.any(Object),
            visibility: expect.any(Object),
            location: expect.any(Object),
            likesCount: expect.any(Object),
            commentsCount: expect.any(Object),
            sharesCount: expect.any(Object),
            createdAt: expect.any(Object),
            updatedAt: expect.any(Object),
          }),
        );
      });

      it('passing IFeedItem should create a new form with FormGroup', () => {
        const formGroup = service.createFeedItemFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            userId: expect.any(Object),
            content: expect.any(Object),
            imageUrl: expect.any(Object),
            videoUrl: expect.any(Object),
            visibility: expect.any(Object),
            location: expect.any(Object),
            likesCount: expect.any(Object),
            commentsCount: expect.any(Object),
            sharesCount: expect.any(Object),
            createdAt: expect.any(Object),
            updatedAt: expect.any(Object),
          }),
        );
      });
    });

    describe('getFeedItem', () => {
      it('should return NewFeedItem for default FeedItem initial value', () => {
        const formGroup = service.createFeedItemFormGroup(sampleWithNewData);

        const feedItem = service.getFeedItem(formGroup) as any;

        expect(feedItem).toMatchObject(sampleWithNewData);
      });

      it('should return NewFeedItem for empty FeedItem initial value', () => {
        const formGroup = service.createFeedItemFormGroup();

        const feedItem = service.getFeedItem(formGroup) as any;

        expect(feedItem).toMatchObject({});
      });

      it('should return IFeedItem', () => {
        const formGroup = service.createFeedItemFormGroup(sampleWithRequiredData);

        const feedItem = service.getFeedItem(formGroup) as any;

        expect(feedItem).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IFeedItem should not enable id FormControl', () => {
        const formGroup = service.createFeedItemFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewFeedItem should disable id FormControl', () => {
        const formGroup = service.createFeedItemFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
