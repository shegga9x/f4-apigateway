import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ILike } from '../like.model';
import { LikeService } from '../service/like.service';
import { LikeFormGroup, LikeFormService } from './like-form.service';

@Component({
  selector: 'jhi-like-update',
  templateUrl: './like-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class LikeUpdateComponent implements OnInit {
  isSaving = false;
  like: ILike | null = null;

  protected likeService = inject(LikeService);
  protected likeFormService = inject(LikeFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: LikeFormGroup = this.likeFormService.createLikeFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ like }) => {
      this.like = like;
      if (like) {
        this.updateForm(like);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const like = this.likeFormService.getLike(this.editForm);
    if (like.id !== null) {
      this.subscribeToSaveResponse(this.likeService.update(like));
    } else {
      this.subscribeToSaveResponse(this.likeService.create(like));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILike>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(like: ILike): void {
    this.like = like;
    this.likeFormService.resetForm(this.editForm, like);
  }
}
