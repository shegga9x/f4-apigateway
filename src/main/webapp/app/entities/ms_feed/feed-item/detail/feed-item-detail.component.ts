import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { FormatMediumDatetimePipe } from 'app/shared/date';
import { IFeedItem } from '../feed-item.model';

@Component({
  selector: 'jhi-feed-item-detail',
  templateUrl: './feed-item-detail.component.html',
  imports: [SharedModule, RouterModule, FormatMediumDatetimePipe],
})
export class FeedItemDetailComponent {
  feedItem = input<IFeedItem | null>(null);

  previousState(): void {
    window.history.back();
  }
}
