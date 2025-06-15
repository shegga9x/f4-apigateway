import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IKeycloakUser } from '../keycloak-user.model';
import { KeycloakUserService } from '../service/keycloak-user.service';
import { KeycloakUserFormGroup, KeycloakUserFormService } from './keycloak-user-form.service';

@Component({
  selector: 'jhi-keycloak-user-update',
  templateUrl: './keycloak-user-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class KeycloakUserUpdateComponent implements OnInit {
  isSaving = false;
  keycloakUser: IKeycloakUser | null = null;

  protected keycloakUserService = inject(KeycloakUserService);
  protected keycloakUserFormService = inject(KeycloakUserFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: KeycloakUserFormGroup = this.keycloakUserFormService.createKeycloakUserFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ keycloakUser }) => {
      this.keycloakUser = keycloakUser;
      if (keycloakUser) {
        this.updateForm(keycloakUser);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const keycloakUser = this.keycloakUserFormService.getKeycloakUser(this.editForm);
    if (keycloakUser.id !== null) {
      this.subscribeToSaveResponse(this.keycloakUserService.update(keycloakUser));
    } else {
      this.subscribeToSaveResponse(this.keycloakUserService.create(keycloakUser));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IKeycloakUser>>): void {
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

  protected updateForm(keycloakUser: IKeycloakUser): void {
    this.keycloakUser = keycloakUser;
    this.keycloakUserFormService.resetForm(this.editForm, keycloakUser);
  }
}
