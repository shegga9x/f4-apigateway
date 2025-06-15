import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { FeedItemDetailComponent } from './feed-item-detail.component';

describe('FeedItem Management Detail Component', () => {
  let comp: FeedItemDetailComponent;
  let fixture: ComponentFixture<FeedItemDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedItemDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./feed-item-detail.component').then(m => m.FeedItemDetailComponent),
              resolve: { feedItem: () => of({ id: 'a0f45389-7f4f-49db-83df-ff9f91ed4a23' }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(FeedItemDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedItemDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load feedItem on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', FeedItemDetailComponent);

      // THEN
      expect(instance.feedItem()).toEqual(expect.objectContaining({ id: 'a0f45389-7f4f-49db-83df-ff9f91ed4a23' }));
    });
  });

  describe('PreviousState', () => {
    it('should navigate to previous state', () => {
      jest.spyOn(window.history, 'back');
      comp.previousState();
      expect(window.history.back).toHaveBeenCalled();
    });
  });
});
