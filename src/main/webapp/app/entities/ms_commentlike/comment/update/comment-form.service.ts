import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IComment, NewComment } from '../comment.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IComment for edit and NewCommentFormGroupInput for create.
 */
type CommentFormGroupInput = IComment | PartialWithRequiredKeyOf<NewComment>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IComment | NewComment> = Omit<T, 'createdAt' | 'updatedAt'> & {
  createdAt?: string | null;
  updatedAt?: string | null;
};

type CommentFormRawValue = FormValueOf<IComment>;

type NewCommentFormRawValue = FormValueOf<NewComment>;

type CommentFormDefaults = Pick<NewComment, 'id' | 'createdAt' | 'updatedAt'>;

type CommentFormGroupContent = {
  id: FormControl<CommentFormRawValue['id'] | NewComment['id']>;
  parentType: FormControl<CommentFormRawValue['parentType']>;
  parentId: FormControl<CommentFormRawValue['parentId']>;
  userId: FormControl<CommentFormRawValue['userId']>;
  content: FormControl<CommentFormRawValue['content']>;
  createdAt: FormControl<CommentFormRawValue['createdAt']>;
  updatedAt: FormControl<CommentFormRawValue['updatedAt']>;
  likesCount: FormControl<CommentFormRawValue['likesCount']>;
  repliesCount: FormControl<CommentFormRawValue['repliesCount']>;
  mentions: FormControl<CommentFormRawValue['mentions']>;
};

export type CommentFormGroup = FormGroup<CommentFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CommentFormService {
  createCommentFormGroup(comment: CommentFormGroupInput = { id: null }): CommentFormGroup {
    const commentRawValue = this.convertCommentToCommentRawValue({
      ...this.getFormDefaults(),
      ...comment,
    });
    return new FormGroup<CommentFormGroupContent>({
      id: new FormControl(
        { value: commentRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      parentType: new FormControl(commentRawValue.parentType, {
        validators: [Validators.required],
      }),
      parentId: new FormControl(commentRawValue.parentId, {
        validators: [Validators.required],
      }),
      userId: new FormControl(commentRawValue.userId, {
        validators: [Validators.required],
      }),
      content: new FormControl(commentRawValue.content, {
        validators: [Validators.required],
      }),
      createdAt: new FormControl(commentRawValue.createdAt, {
        validators: [Validators.required],
      }),
      updatedAt: new FormControl(commentRawValue.updatedAt, {
        validators: [Validators.required],
      }),
      likesCount: new FormControl(commentRawValue.likesCount, {
        validators: [Validators.required],
      }),
      repliesCount: new FormControl(commentRawValue.repliesCount, {
        validators: [Validators.required],
      }),
      mentions: new FormControl(commentRawValue.mentions),
    });
  }

  getComment(form: CommentFormGroup): IComment | NewComment {
    return this.convertCommentRawValueToComment(form.getRawValue() as CommentFormRawValue | NewCommentFormRawValue);
  }

  resetForm(form: CommentFormGroup, comment: CommentFormGroupInput): void {
    const commentRawValue = this.convertCommentToCommentRawValue({ ...this.getFormDefaults(), ...comment });
    form.reset(
      {
        ...commentRawValue,
        id: { value: commentRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): CommentFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      createdAt: currentTime,
      updatedAt: currentTime,
    };
  }

  private convertCommentRawValueToComment(rawComment: CommentFormRawValue | NewCommentFormRawValue): IComment | NewComment {
    return {
      ...rawComment,
      createdAt: dayjs(rawComment.createdAt, DATE_TIME_FORMAT),
      updatedAt: dayjs(rawComment.updatedAt, DATE_TIME_FORMAT),
    };
  }

  private convertCommentToCommentRawValue(
    comment: IComment | (Partial<NewComment> & CommentFormDefaults),
  ): CommentFormRawValue | PartialWithRequiredKeyOf<NewCommentFormRawValue> {
    return {
      ...comment,
      createdAt: comment.createdAt ? comment.createdAt.format(DATE_TIME_FORMAT) : undefined,
      updatedAt: comment.updatedAt ? comment.updatedAt.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
