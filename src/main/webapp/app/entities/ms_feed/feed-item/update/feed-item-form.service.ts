import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IFeedItem, NewFeedItem } from '../feed-item.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFeedItem for edit and NewFeedItemFormGroupInput for create.
 */
type FeedItemFormGroupInput = IFeedItem | PartialWithRequiredKeyOf<NewFeedItem>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IFeedItem | NewFeedItem> = Omit<T, 'timestamp'> & {
  timestamp?: string | null;
};

type FeedItemFormRawValue = FormValueOf<IFeedItem>;

type NewFeedItemFormRawValue = FormValueOf<NewFeedItem>;

type FeedItemFormDefaults = Pick<NewFeedItem, 'id' | 'timestamp'>;

type FeedItemFormGroupContent = {
  id: FormControl<FeedItemFormRawValue['id'] | NewFeedItem['id']>;
  userId: FormControl<FeedItemFormRawValue['userId']>;
  reelId: FormControl<FeedItemFormRawValue['reelId']>;
  timestamp: FormControl<FeedItemFormRawValue['timestamp']>;
};

export type FeedItemFormGroup = FormGroup<FeedItemFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FeedItemFormService {
  createFeedItemFormGroup(feedItem: FeedItemFormGroupInput = { id: null }): FeedItemFormGroup {
    const feedItemRawValue = this.convertFeedItemToFeedItemRawValue({
      ...this.getFormDefaults(),
      ...feedItem,
    });
    return new FormGroup<FeedItemFormGroupContent>({
      id: new FormControl(
        { value: feedItemRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      userId: new FormControl(feedItemRawValue.userId, {
        validators: [Validators.required],
      }),
      reelId: new FormControl(feedItemRawValue.reelId, {
        validators: [Validators.required],
      }),
      timestamp: new FormControl(feedItemRawValue.timestamp, {
        validators: [Validators.required],
      }),
    });
  }

  getFeedItem(form: FeedItemFormGroup): IFeedItem | NewFeedItem {
    return this.convertFeedItemRawValueToFeedItem(form.getRawValue() as FeedItemFormRawValue | NewFeedItemFormRawValue);
  }

  resetForm(form: FeedItemFormGroup, feedItem: FeedItemFormGroupInput): void {
    const feedItemRawValue = this.convertFeedItemToFeedItemRawValue({ ...this.getFormDefaults(), ...feedItem });
    form.reset(
      {
        ...feedItemRawValue,
        id: { value: feedItemRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): FeedItemFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      timestamp: currentTime,
    };
  }

  private convertFeedItemRawValueToFeedItem(rawFeedItem: FeedItemFormRawValue | NewFeedItemFormRawValue): IFeedItem | NewFeedItem {
    return {
      ...rawFeedItem,
      timestamp: dayjs(rawFeedItem.timestamp, DATE_TIME_FORMAT),
    };
  }

  private convertFeedItemToFeedItemRawValue(
    feedItem: IFeedItem | (Partial<NewFeedItem> & FeedItemFormDefaults),
  ): FeedItemFormRawValue | PartialWithRequiredKeyOf<NewFeedItemFormRawValue> {
    return {
      ...feedItem,
      timestamp: feedItem.timestamp ? feedItem.timestamp.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
