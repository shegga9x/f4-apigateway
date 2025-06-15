import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IFeedItem } from '../feed-item.model';
import { FeedItemService } from '../service/feed-item.service';

@Component({
  templateUrl: './feed-item-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class FeedItemDeleteDialogComponent {
  feedItem?: IFeedItem;

  protected feedItemService = inject(FeedItemService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.feedItemService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
