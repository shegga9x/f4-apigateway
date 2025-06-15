import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { FeedItemService } from '../service/feed-item.service';
import { IFeedItem } from '../feed-item.model';
import { FeedItemFormService } from './feed-item-form.service';

import { FeedItemUpdateComponent } from './feed-item-update.component';

describe('FeedItem Management Update Component', () => {
  let comp: FeedItemUpdateComponent;
  let fixture: ComponentFixture<FeedItemUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let feedItemFormService: FeedItemFormService;
  let feedItemService: FeedItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FeedItemUpdateComponent],
      providers: [
        provideHttpClient(),
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(FeedItemUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FeedItemUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    feedItemFormService = TestBed.inject(FeedItemFormService);
    feedItemService = TestBed.inject(FeedItemService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should update editForm', () => {
      const feedItem: IFeedItem = { id: 'eb2cc268-70b2-483e-8f88-e7e151e50605' };

      activatedRoute.data = of({ feedItem });
      comp.ngOnInit();

      expect(comp.feedItem).toEqual(feedItem);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFeedItem>>();
      const feedItem = { id: 'a0f45389-7f4f-49db-83df-ff9f91ed4a23' };
      jest.spyOn(feedItemFormService, 'getFeedItem').mockReturnValue(feedItem);
      jest.spyOn(feedItemService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ feedItem });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: feedItem }));
      saveSubject.complete();

      // THEN
      expect(feedItemFormService.getFeedItem).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(feedItemService.update).toHaveBeenCalledWith(expect.objectContaining(feedItem));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFeedItem>>();
      const feedItem = { id: 'a0f45389-7f4f-49db-83df-ff9f91ed4a23' };
      jest.spyOn(feedItemFormService, 'getFeedItem').mockReturnValue({ id: null });
      jest.spyOn(feedItemService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ feedItem: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: feedItem }));
      saveSubject.complete();

      // THEN
      expect(feedItemFormService.getFeedItem).toHaveBeenCalled();
      expect(feedItemService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFeedItem>>();
      const feedItem = { id: 'a0f45389-7f4f-49db-83df-ff9f91ed4a23' };
      jest.spyOn(feedItemService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ feedItem });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(feedItemService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
