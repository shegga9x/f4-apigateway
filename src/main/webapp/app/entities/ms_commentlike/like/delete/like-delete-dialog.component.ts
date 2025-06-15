import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ILike } from '../like.model';
import { LikeService } from '../service/like.service';

@Component({
  templateUrl: './like-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class LikeDeleteDialogComponent {
  like?: ILike;

  protected likeService = inject(LikeService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.likeService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
