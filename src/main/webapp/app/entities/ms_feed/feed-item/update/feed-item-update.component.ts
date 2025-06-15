import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IFeedItem } from '../feed-item.model';
import { FeedItemService } from '../service/feed-item.service';
import { FeedItemFormGroup, FeedItemFormService } from './feed-item-form.service';

@Component({
  selector: 'jhi-feed-item-update',
  templateUrl: './feed-item-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class FeedItemUpdateComponent implements OnInit {
  isSaving = false;
  feedItem: IFeedItem | null = null;

  protected feedItemService = inject(FeedItemService);
  protected feedItemFormService = inject(FeedItemFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: FeedItemFormGroup = this.feedItemFormService.createFeedItemFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ feedItem }) => {
      this.feedItem = feedItem;
      if (feedItem) {
        this.updateForm(feedItem);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const feedItem = this.feedItemFormService.getFeedItem(this.editForm);
    if (feedItem.id !== null) {
      this.subscribeToSaveResponse(this.feedItemService.update(feedItem));
    } else {
      this.subscribeToSaveResponse(this.feedItemService.create(feedItem));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFeedItem>>): void {
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

  protected updateForm(feedItem: IFeedItem): void {
    this.feedItem = feedItem;
    this.feedItemFormService.resetForm(this.editForm, feedItem);
  }
}
