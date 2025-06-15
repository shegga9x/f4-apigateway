import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../reel.test-samples';

import { ReelFormService } from './reel-form.service';

describe('Reel Form Service', () => {
  let service: ReelFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReelFormService);
  });

  describe('Service methods', () => {
    describe('createReelFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createReelFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            userId: expect.any(Object),
            title: expect.any(Object),
            videoUrl: expect.any(Object),
            createdAt: expect.any(Object),
          }),
        );
      });

      it('passing IReel should create a new form with FormGroup', () => {
        const formGroup = service.createReelFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            userId: expect.any(Object),
            title: expect.any(Object),
            videoUrl: expect.any(Object),
            createdAt: expect.any(Object),
          }),
        );
      });
    });

    describe('getReel', () => {
      it('should return NewReel for default Reel initial value', () => {
        const formGroup = service.createReelFormGroup(sampleWithNewData);

        const reel = service.getReel(formGroup) as any;

        expect(reel).toMatchObject(sampleWithNewData);
      });

      it('should return NewReel for empty Reel initial value', () => {
        const formGroup = service.createReelFormGroup();

        const reel = service.getReel(formGroup) as any;

        expect(reel).toMatchObject({});
      });

      it('should return IReel', () => {
        const formGroup = service.createReelFormGroup(sampleWithRequiredData);

        const reel = service.getReel(formGroup) as any;

        expect(reel).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IReel should not enable id FormControl', () => {
        const formGroup = service.createReelFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewReel should disable id FormControl', () => {
        const formGroup = service.createReelFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
