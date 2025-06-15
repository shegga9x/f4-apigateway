import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { LikeDetailComponent } from './like-detail.component';

describe('Like Management Detail Component', () => {
  let comp: LikeDetailComponent;
  let fixture: ComponentFixture<LikeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LikeDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./like-detail.component').then(m => m.LikeDetailComponent),
              resolve: { like: () => of({ id: 'b8baf884-7c93-4f07-a4cc-a45a939df15b' }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(LikeDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LikeDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load like on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', LikeDetailComponent);

      // THEN
      expect(instance.like()).toEqual(expect.objectContaining({ id: 'b8baf884-7c93-4f07-a4cc-a45a939df15b' }));
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
