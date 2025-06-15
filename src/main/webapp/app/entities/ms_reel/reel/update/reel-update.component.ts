import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IReel } from '../reel.model';
import { ReelService } from '../service/reel.service';
import { ReelFormGroup, ReelFormService } from './reel-form.service';

@Component({
  selector: 'jhi-reel-update',
  templateUrl: './reel-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ReelUpdateComponent implements OnInit {
  isSaving = false;
  reel: IReel | null = null;

  protected reelService = inject(ReelService);
  protected reelFormService = inject(ReelFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: ReelFormGroup = this.reelFormService.createReelFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ reel }) => {
      this.reel = reel;
      if (reel) {
        this.updateForm(reel);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const reel = this.reelFormService.getReel(this.editForm);
    if (reel.id !== null) {
      this.subscribeToSaveResponse(this.reelService.update(reel));
    } else {
      this.subscribeToSaveResponse(this.reelService.create(reel));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReel>>): void {
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

  protected updateForm(reel: IReel): void {
    this.reel = reel;
    this.reelFormService.resetForm(this.editForm, reel);
  }
}
