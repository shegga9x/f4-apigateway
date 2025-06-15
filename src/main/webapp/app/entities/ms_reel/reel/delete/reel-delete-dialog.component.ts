import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IReel } from '../reel.model';
import { ReelService } from '../service/reel.service';

@Component({
  templateUrl: './reel-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class ReelDeleteDialogComponent {
  reel?: IReel;

  protected reelService = inject(ReelService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.reelService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
