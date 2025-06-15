import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { LikeService } from '../service/like.service';
import { ILike } from '../like.model';
import { LikeFormService } from './like-form.service';

import { LikeUpdateComponent } from './like-update.component';

describe('Like Management Update Component', () => {
  let comp: LikeUpdateComponent;
  let fixture: ComponentFixture<LikeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let likeFormService: LikeFormService;
  let likeService: LikeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LikeUpdateComponent],
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
      .overrideTemplate(LikeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(LikeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    likeFormService = TestBed.inject(LikeFormService);
    likeService = TestBed.inject(LikeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should update editForm', () => {
      const like: ILike = { id: '0e3fb7f6-934c-459f-97d0-fe1cee3c7d2d' };

      activatedRoute.data = of({ like });
      comp.ngOnInit();

      expect(comp.like).toEqual(like);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILike>>();
      const like = { id: 'b8baf884-7c93-4f07-a4cc-a45a939df15b' };
      jest.spyOn(likeFormService, 'getLike').mockReturnValue(like);
      jest.spyOn(likeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ like });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: like }));
      saveSubject.complete();

      // THEN
      expect(likeFormService.getLike).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(likeService.update).toHaveBeenCalledWith(expect.objectContaining(like));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILike>>();
      const like = { id: 'b8baf884-7c93-4f07-a4cc-a45a939df15b' };
      jest.spyOn(likeFormService, 'getLike').mockReturnValue({ id: null });
      jest.spyOn(likeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ like: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: like }));
      saveSubject.complete();

      // THEN
      expect(likeFormService.getLike).toHaveBeenCalled();
      expect(likeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILike>>();
      const like = { id: 'b8baf884-7c93-4f07-a4cc-a45a939df15b' };
      jest.spyOn(likeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ like });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(likeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
