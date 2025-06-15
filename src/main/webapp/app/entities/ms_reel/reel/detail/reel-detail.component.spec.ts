import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { ReelDetailComponent } from './reel-detail.component';

describe('Reel Management Detail Component', () => {
  let comp: ReelDetailComponent;
  let fixture: ComponentFixture<ReelDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReelDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./reel-detail.component').then(m => m.ReelDetailComponent),
              resolve: { reel: () => of({ id: '457e621a-61d9-4220-a9c4-ccccdfb83cee' }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(ReelDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReelDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load reel on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', ReelDetailComponent);

      // THEN
      expect(instance.reel()).toEqual(expect.objectContaining({ id: '457e621a-61d9-4220-a9c4-ccccdfb83cee' }));
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
