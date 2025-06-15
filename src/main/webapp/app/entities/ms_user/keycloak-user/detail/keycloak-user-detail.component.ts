import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { IKeycloakUser } from '../keycloak-user.model';

@Component({
  selector: 'jhi-keycloak-user-detail',
  templateUrl: './keycloak-user-detail.component.html',
  imports: [SharedModule, RouterModule],
})
export class KeycloakUserDetailComponent {
  keycloakUser = input<IKeycloakUser | null>(null);

  previousState(): void {
    window.history.back();
  }
}
