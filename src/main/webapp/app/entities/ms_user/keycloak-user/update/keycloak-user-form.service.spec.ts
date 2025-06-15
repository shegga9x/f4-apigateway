import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../keycloak-user.test-samples';

import { KeycloakUserFormService } from './keycloak-user-form.service';

describe('KeycloakUser Form Service', () => {
  let service: KeycloakUserFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeycloakUserFormService);
  });

  describe('Service methods', () => {
    describe('createKeycloakUserFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createKeycloakUserFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            username: expect.any(Object),
            email: expect.any(Object),
            realmId: expect.any(Object),
            userId: expect.any(Object),
          }),
        );
      });

      it('passing IKeycloakUser should create a new form with FormGroup', () => {
        const formGroup = service.createKeycloakUserFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            username: expect.any(Object),
            email: expect.any(Object),
            realmId: expect.any(Object),
            userId: expect.any(Object),
          }),
        );
      });
    });

    describe('getKeycloakUser', () => {
      it('should return NewKeycloakUser for default KeycloakUser initial value', () => {
        const formGroup = service.createKeycloakUserFormGroup(sampleWithNewData);

        const keycloakUser = service.getKeycloakUser(formGroup) as any;

        expect(keycloakUser).toMatchObject(sampleWithNewData);
      });

      it('should return NewKeycloakUser for empty KeycloakUser initial value', () => {
        const formGroup = service.createKeycloakUserFormGroup();

        const keycloakUser = service.getKeycloakUser(formGroup) as any;

        expect(keycloakUser).toMatchObject({});
      });

      it('should return IKeycloakUser', () => {
        const formGroup = service.createKeycloakUserFormGroup(sampleWithRequiredData);

        const keycloakUser = service.getKeycloakUser(formGroup) as any;

        expect(keycloakUser).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IKeycloakUser should not enable id FormControl', () => {
        const formGroup = service.createKeycloakUserFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewKeycloakUser should disable id FormControl', () => {
        const formGroup = service.createKeycloakUserFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
