import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IKeycloakUser, NewKeycloakUser } from '../keycloak-user.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IKeycloakUser for edit and NewKeycloakUserFormGroupInput for create.
 */
type KeycloakUserFormGroupInput = IKeycloakUser | PartialWithRequiredKeyOf<NewKeycloakUser>;

type KeycloakUserFormDefaults = Pick<NewKeycloakUser, 'id'>;

type KeycloakUserFormGroupContent = {
  id: FormControl<IKeycloakUser['id'] | NewKeycloakUser['id']>;
  username: FormControl<IKeycloakUser['username']>;
  email: FormControl<IKeycloakUser['email']>;
  realmId: FormControl<IKeycloakUser['realmId']>;
  userId: FormControl<IKeycloakUser['userId']>;
};

export type KeycloakUserFormGroup = FormGroup<KeycloakUserFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class KeycloakUserFormService {
  createKeycloakUserFormGroup(keycloakUser: KeycloakUserFormGroupInput = { id: null }): KeycloakUserFormGroup {
    const keycloakUserRawValue = {
      ...this.getFormDefaults(),
      ...keycloakUser,
    };
    return new FormGroup<KeycloakUserFormGroupContent>({
      id: new FormControl(
        { value: keycloakUserRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      username: new FormControl(keycloakUserRawValue.username, {
        validators: [Validators.required],
      }),
      email: new FormControl(keycloakUserRawValue.email, {
        validators: [Validators.required],
      }),
      realmId: new FormControl(keycloakUserRawValue.realmId, {
        validators: [Validators.required],
      }),
      userId: new FormControl(keycloakUserRawValue.userId, {
        validators: [Validators.required],
      }),
    });
  }

  getKeycloakUser(form: KeycloakUserFormGroup): IKeycloakUser | NewKeycloakUser {
    return form.getRawValue() as IKeycloakUser | NewKeycloakUser;
  }

  resetForm(form: KeycloakUserFormGroup, keycloakUser: KeycloakUserFormGroupInput): void {
    const keycloakUserRawValue = { ...this.getFormDefaults(), ...keycloakUser };
    form.reset(
      {
        ...keycloakUserRawValue,
        id: { value: keycloakUserRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): KeycloakUserFormDefaults {
    return {
      id: null,
    };
  }
}
