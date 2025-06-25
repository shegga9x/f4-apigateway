import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { FeedVisibility } from 'app/entities/enumerations/feed-visibility.model';
import { FeedItemService } from '../service/feed-item.service';
import { IFeedItem } from '../feed-item.model';
import { FeedItemFormGroup, FeedItemFormService } from './feed-item-form.service';

@Component({
  selector: 'jhi-feed-item-update',
  templateUrl: './feed-item-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class FeedItemUpdateComponent implements OnInit {
  isSaving = false;
  feedItem: IFeedItem | null = null;
  feedVisibilityValues = Object.keys(FeedVisibility);

  protected dataUtils = inject(DataUtils);
  protected eventManager = inject(EventManager);
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

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(new EventWithContent<AlertError>('gatewayApp.error', { ...err, key: `error.file.${err.key}` })),
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
