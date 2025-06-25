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
type FormValueOf<T extends IFeedItem | NewFeedItem> = Omit<T, 'createdAt' | 'updatedAt'> & {
  createdAt?: string | null;
  updatedAt?: string | null;
};

type FeedItemFormRawValue = FormValueOf<IFeedItem>;

type NewFeedItemFormRawValue = FormValueOf<NewFeedItem>;

type FeedItemFormDefaults = Pick<NewFeedItem, 'id' | 'createdAt' | 'updatedAt'>;

type FeedItemFormGroupContent = {
  id: FormControl<FeedItemFormRawValue['id'] | NewFeedItem['id']>;
  userId: FormControl<FeedItemFormRawValue['userId']>;
  content: FormControl<FeedItemFormRawValue['content']>;
  imageUrl: FormControl<FeedItemFormRawValue['imageUrl']>;
  videoUrl: FormControl<FeedItemFormRawValue['videoUrl']>;
  visibility: FormControl<FeedItemFormRawValue['visibility']>;
  location: FormControl<FeedItemFormRawValue['location']>;
  likesCount: FormControl<FeedItemFormRawValue['likesCount']>;
  commentsCount: FormControl<FeedItemFormRawValue['commentsCount']>;
  sharesCount: FormControl<FeedItemFormRawValue['sharesCount']>;
  createdAt: FormControl<FeedItemFormRawValue['createdAt']>;
  updatedAt: FormControl<FeedItemFormRawValue['updatedAt']>;
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
      content: new FormControl(feedItemRawValue.content),
      imageUrl: new FormControl(feedItemRawValue.imageUrl),
      videoUrl: new FormControl(feedItemRawValue.videoUrl),
      visibility: new FormControl(feedItemRawValue.visibility),
      location: new FormControl(feedItemRawValue.location),
      likesCount: new FormControl(feedItemRawValue.likesCount),
      commentsCount: new FormControl(feedItemRawValue.commentsCount),
      sharesCount: new FormControl(feedItemRawValue.sharesCount),
      createdAt: new FormControl(feedItemRawValue.createdAt, {
        validators: [Validators.required],
      }),
      updatedAt: new FormControl(feedItemRawValue.updatedAt, {
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
      createdAt: currentTime,
      updatedAt: currentTime,
    };
  }

  private convertFeedItemRawValueToFeedItem(rawFeedItem: FeedItemFormRawValue | NewFeedItemFormRawValue): IFeedItem | NewFeedItem {
    return {
      ...rawFeedItem,
      createdAt: dayjs(rawFeedItem.createdAt, DATE_TIME_FORMAT),
      updatedAt: dayjs(rawFeedItem.updatedAt, DATE_TIME_FORMAT),
    };
  }

  private convertFeedItemToFeedItemRawValue(
    feedItem: IFeedItem | (Partial<NewFeedItem> & FeedItemFormDefaults),
  ): FeedItemFormRawValue | PartialWithRequiredKeyOf<NewFeedItemFormRawValue> {
    return {
      ...feedItem,
      createdAt: feedItem.createdAt ? feedItem.createdAt.format(DATE_TIME_FORMAT) : undefined,
      updatedAt: feedItem.updatedAt ? feedItem.updatedAt.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
