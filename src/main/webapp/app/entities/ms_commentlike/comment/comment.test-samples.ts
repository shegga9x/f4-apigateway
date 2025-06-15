import dayjs from 'dayjs/esm';

import { IComment, NewComment } from './comment.model';

export const sampleWithRequiredData: IComment = {
  id: '9a71503e-0ebe-4d9d-b165-5df677db7186',
  reelId: '1ecd8e44-7434-4496-99f1-40de7f676c3c',
  userId: '84973d8c-b7eb-4e52-81c7-50a843968611',
  content: '../fake-data/blob/hipster.txt',
  createdAt: dayjs('2025-06-14T07:49'),
};

export const sampleWithPartialData: IComment = {
  id: '6392db02-5846-4067-b73d-3d74f7a9706a',
  reelId: 'ef0f7426-d39a-4d0d-aeb9-78cd5f5f5c6c',
  userId: '544b23c7-5ca7-4e8d-9b9c-558db6255b82',
  content: '../fake-data/blob/hipster.txt',
  createdAt: dayjs('2025-06-13T17:47'),
};

export const sampleWithFullData: IComment = {
  id: 'd9476c1d-ee6d-43be-9996-d4be592c00a5',
  reelId: 'e9a7857e-ff2a-477e-a305-8c05a72675af',
  userId: '6e5d9ef5-f7d2-4d07-b049-957388944be2',
  content: '../fake-data/blob/hipster.txt',
  createdAt: dayjs('2025-06-13T12:04'),
};

export const sampleWithNewData: NewComment = {
  reelId: 'f8fd5408-3bf6-413e-acdb-78e78af6083c',
  userId: '22b94d64-5cac-406d-92ea-0763115d9131',
  content: '../fake-data/blob/hipster.txt',
  createdAt: dayjs('2025-06-13T17:21'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
