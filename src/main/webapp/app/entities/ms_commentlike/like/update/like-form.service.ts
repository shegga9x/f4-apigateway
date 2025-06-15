import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ILike, NewLike } from '../like.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ILike for edit and NewLikeFormGroupInput for create.
 */
type LikeFormGroupInput = ILike | PartialWithRequiredKeyOf<NewLike>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ILike | NewLike> = Omit<T, 'createdAt'> & {
  createdAt?: string | null;
};

type LikeFormRawValue = FormValueOf<ILike>;

type NewLikeFormRawValue = FormValueOf<NewLike>;

type LikeFormDefaults = Pick<NewLike, 'id' | 'createdAt'>;

type LikeFormGroupContent = {
  id: FormControl<LikeFormRawValue['id'] | NewLike['id']>;
  reelId: FormControl<LikeFormRawValue['reelId']>;
  userId: FormControl<LikeFormRawValue['userId']>;
  createdAt: FormControl<LikeFormRawValue['createdAt']>;
};

export type LikeFormGroup = FormGroup<LikeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class LikeFormService {
  createLikeFormGroup(like: LikeFormGroupInput = { id: null }): LikeFormGroup {
    const likeRawValue = this.convertLikeToLikeRawValue({
      ...this.getFormDefaults(),
      ...like,
    });
    return new FormGroup<LikeFormGroupContent>({
      id: new FormControl(
        { value: likeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      reelId: new FormControl(likeRawValue.reelId, {
        validators: [Validators.required],
      }),
      userId: new FormControl(likeRawValue.userId, {
        validators: [Validators.required],
      }),
      createdAt: new FormControl(likeRawValue.createdAt, {
        validators: [Validators.required],
      }),
    });
  }

  getLike(form: LikeFormGroup): ILike | NewLike {
    return this.convertLikeRawValueToLike(form.getRawValue() as LikeFormRawValue | NewLikeFormRawValue);
  }

  resetForm(form: LikeFormGroup, like: LikeFormGroupInput): void {
    const likeRawValue = this.convertLikeToLikeRawValue({ ...this.getFormDefaults(), ...like });
    form.reset(
      {
        ...likeRawValue,
        id: { value: likeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): LikeFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      createdAt: currentTime,
    };
  }

  private convertLikeRawValueToLike(rawLike: LikeFormRawValue | NewLikeFormRawValue): ILike | NewLike {
    return {
      ...rawLike,
      createdAt: dayjs(rawLike.createdAt, DATE_TIME_FORMAT),
    };
  }

  private convertLikeToLikeRawValue(
    like: ILike | (Partial<NewLike> & LikeFormDefaults),
  ): LikeFormRawValue | PartialWithRequiredKeyOf<NewLikeFormRawValue> {
    return {
      ...like,
      createdAt: like.createdAt ? like.createdAt.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
