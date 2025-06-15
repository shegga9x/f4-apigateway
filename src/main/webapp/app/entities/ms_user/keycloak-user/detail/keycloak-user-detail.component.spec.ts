import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { KeycloakUserDetailComponent } from './keycloak-user-detail.component';

describe('KeycloakUser Management Detail Component', () => {
  let comp: KeycloakUserDetailComponent;
  let fixture: ComponentFixture<KeycloakUserDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeycloakUserDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./keycloak-user-detail.component').then(m => m.KeycloakUserDetailComponent),
              resolve: { keycloakUser: () => of({ id: '9aecda41-0e2d-4fef-bdf5-5630ce63b8a9' }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(KeycloakUserDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeycloakUserDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load keycloakUser on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', KeycloakUserDetailComponent);

      // THEN
      expect(instance.keycloakUser()).toEqual(expect.objectContaining({ id: '9aecda41-0e2d-4fef-bdf5-5630ce63b8a9' }));
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
