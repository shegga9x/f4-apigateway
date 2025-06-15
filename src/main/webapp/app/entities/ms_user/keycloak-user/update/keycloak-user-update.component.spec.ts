import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { KeycloakUserService } from '../service/keycloak-user.service';
import { IKeycloakUser } from '../keycloak-user.model';
import { KeycloakUserFormService } from './keycloak-user-form.service';

import { KeycloakUserUpdateComponent } from './keycloak-user-update.component';

describe('KeycloakUser Management Update Component', () => {
  let comp: KeycloakUserUpdateComponent;
  let fixture: ComponentFixture<KeycloakUserUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let keycloakUserFormService: KeycloakUserFormService;
  let keycloakUserService: KeycloakUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [KeycloakUserUpdateComponent],
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
      .overrideTemplate(KeycloakUserUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(KeycloakUserUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    keycloakUserFormService = TestBed.inject(KeycloakUserFormService);
    keycloakUserService = TestBed.inject(KeycloakUserService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should update editForm', () => {
      const keycloakUser: IKeycloakUser = { id: 'bc1b373a-136f-4ab8-a255-2d4a5f60fe29' };

      activatedRoute.data = of({ keycloakUser });
      comp.ngOnInit();

      expect(comp.keycloakUser).toEqual(keycloakUser);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IKeycloakUser>>();
      const keycloakUser = { id: '9aecda41-0e2d-4fef-bdf5-5630ce63b8a9' };
      jest.spyOn(keycloakUserFormService, 'getKeycloakUser').mockReturnValue(keycloakUser);
      jest.spyOn(keycloakUserService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ keycloakUser });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: keycloakUser }));
      saveSubject.complete();

      // THEN
      expect(keycloakUserFormService.getKeycloakUser).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(keycloakUserService.update).toHaveBeenCalledWith(expect.objectContaining(keycloakUser));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IKeycloakUser>>();
      const keycloakUser = { id: '9aecda41-0e2d-4fef-bdf5-5630ce63b8a9' };
      jest.spyOn(keycloakUserFormService, 'getKeycloakUser').mockReturnValue({ id: null });
      jest.spyOn(keycloakUserService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ keycloakUser: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: keycloakUser }));
      saveSubject.complete();

      // THEN
      expect(keycloakUserFormService.getKeycloakUser).toHaveBeenCalled();
      expect(keycloakUserService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IKeycloakUser>>();
      const keycloakUser = { id: '9aecda41-0e2d-4fef-bdf5-5630ce63b8a9' };
      jest.spyOn(keycloakUserService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ keycloakUser });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(keycloakUserService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
