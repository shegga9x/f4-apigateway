import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IReel, NewReel } from '../reel.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IReel for edit and NewReelFormGroupInput for create.
 */
type ReelFormGroupInput = IReel | PartialWithRequiredKeyOf<NewReel>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IReel | NewReel> = Omit<T, 'createdAt'> & {
  createdAt?: string | null;
};

type ReelFormRawValue = FormValueOf<IReel>;

type NewReelFormRawValue = FormValueOf<NewReel>;

type ReelFormDefaults = Pick<NewReel, 'id' | 'createdAt'>;

type ReelFormGroupContent = {
  id: FormControl<ReelFormRawValue['id'] | NewReel['id']>;
  userId: FormControl<ReelFormRawValue['userId']>;
  title: FormControl<ReelFormRawValue['title']>;
  videoUrl: FormControl<ReelFormRawValue['videoUrl']>;
  createdAt: FormControl<ReelFormRawValue['createdAt']>;
};

export type ReelFormGroup = FormGroup<ReelFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ReelFormService {
  createReelFormGroup(reel: ReelFormGroupInput = { id: null }): ReelFormGroup {
    const reelRawValue = this.convertReelToReelRawValue({
      ...this.getFormDefaults(),
      ...reel,
    });
    return new FormGroup<ReelFormGroupContent>({
      id: new FormControl(
        { value: reelRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      userId: new FormControl(reelRawValue.userId, {
        validators: [Validators.required],
      }),
      title: new FormControl(reelRawValue.title, {
        validators: [Validators.required],
      }),
      videoUrl: new FormControl(reelRawValue.videoUrl, {
        validators: [Validators.required],
      }),
      createdAt: new FormControl(reelRawValue.createdAt, {
        validators: [Validators.required],
      }),
    });
  }

  getReel(form: ReelFormGroup): IReel | NewReel {
    return this.convertReelRawValueToReel(form.getRawValue() as ReelFormRawValue | NewReelFormRawValue);
  }

  resetForm(form: ReelFormGroup, reel: ReelFormGroupInput): void {
    const reelRawValue = this.convertReelToReelRawValue({ ...this.getFormDefaults(), ...reel });
    form.reset(
      {
        ...reelRawValue,
        id: { value: reelRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ReelFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      createdAt: currentTime,
    };
  }

  private convertReelRawValueToReel(rawReel: ReelFormRawValue | NewReelFormRawValue): IReel | NewReel {
    return {
      ...rawReel,
      createdAt: dayjs(rawReel.createdAt, DATE_TIME_FORMAT),
    };
  }

  private convertReelToReelRawValue(
    reel: IReel | (Partial<NewReel> & ReelFormDefaults),
  ): ReelFormRawValue | PartialWithRequiredKeyOf<NewReelFormRawValue> {
    return {
      ...reel,
      createdAt: reel.createdAt ? reel.createdAt.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
