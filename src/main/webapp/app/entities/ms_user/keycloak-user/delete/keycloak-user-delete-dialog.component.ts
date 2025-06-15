import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IKeycloakUser } from '../keycloak-user.model';
import { KeycloakUserService } from '../service/keycloak-user.service';

@Component({
  templateUrl: './keycloak-user-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class KeycloakUserDeleteDialogComponent {
  keycloakUser?: IKeycloakUser;

  protected keycloakUserService = inject(KeycloakUserService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.keycloakUserService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
