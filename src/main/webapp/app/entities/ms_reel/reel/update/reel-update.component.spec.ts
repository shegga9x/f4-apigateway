import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { ReelService } from '../service/reel.service';
import { IReel } from '../reel.model';
import { ReelFormService } from './reel-form.service';

import { ReelUpdateComponent } from './reel-update.component';

describe('Reel Management Update Component', () => {
  let comp: ReelUpdateComponent;
  let fixture: ComponentFixture<ReelUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let reelFormService: ReelFormService;
  let reelService: ReelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReelUpdateComponent],
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
      .overrideTemplate(ReelUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ReelUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    reelFormService = TestBed.inject(ReelFormService);
    reelService = TestBed.inject(ReelService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should update editForm', () => {
      const reel: IReel = { id: '3dc17a2a-b5c4-4796-bfeb-262e1f0d159e' };

      activatedRoute.data = of({ reel });
      comp.ngOnInit();

      expect(comp.reel).toEqual(reel);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IReel>>();
      const reel = { id: '457e621a-61d9-4220-a9c4-ccccdfb83cee' };
      jest.spyOn(reelFormService, 'getReel').mockReturnValue(reel);
      jest.spyOn(reelService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ reel });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: reel }));
      saveSubject.complete();

      // THEN
      expect(reelFormService.getReel).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(reelService.update).toHaveBeenCalledWith(expect.objectContaining(reel));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IReel>>();
      const reel = { id: '457e621a-61d9-4220-a9c4-ccccdfb83cee' };
      jest.spyOn(reelFormService, 'getReel').mockReturnValue({ id: null });
      jest.spyOn(reelService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ reel: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: reel }));
      saveSubject.complete();

      // THEN
      expect(reelFormService.getReel).toHaveBeenCalled();
      expect(reelService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IReel>>();
      const reel = { id: '457e621a-61d9-4220-a9c4-ccccdfb83cee' };
      jest.spyOn(reelService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ reel });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(reelService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
