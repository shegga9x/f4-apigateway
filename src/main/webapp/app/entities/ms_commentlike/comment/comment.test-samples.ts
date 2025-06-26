import dayjs from 'dayjs/esm';

import { IComment, NewComment } from './comment.model';

export const sampleWithRequiredData: IComment = {
  id: '9a71503e-0ebe-4d9d-b165-5df677db7186',
  parentType: 'happily',
  parentId: '74344969-f140-4de7-bf67-6c3c484973d8',
  userId: 'b7ebe521-c750-4a84-a396-86112dae0869',
  content: '../fake-data/blob/hipster.txt',
  createdAt: dayjs('2025-04-21T16:37'),
  updatedAt: dayjs('2025-04-21T21:22'),
};

export const sampleWithPartialData: IComment = {
  id: '392db025-8460-4677-b3d3-d74f7a9706ae',
  parentType: 'hmph whoever good',
  parentId: 'f5f5c6cb-544b-423c-a75c-a7e8db9c558d',
  userId: '6255b826-41a5-4895-844c-f0aaaa9c51e0',
  content: '../fake-data/blob/hipster.txt',
  createdAt: dayjs('2025-04-21T15:03'),
  updatedAt: dayjs('2025-04-21T10:22'),
  mentions: '345a73f1-4d0b-42fd-85ca-e579be469f50',
};

export const sampleWithFullData: IComment = {
  id: 'd9476c1d-ee6d-43be-9996-d4be592c00a5',
  parentType: 'until er gastropod',
  parentId: 'a72675af-a6e5-4d9e-8f5f-7d2d07049957',
  userId: '88944be2-e07e-445f-866b-70879029a38d',
  content: '../fake-data/blob/hipster.txt',
  createdAt: dayjs('2025-04-21T19:05'),
  updatedAt: dayjs('2025-04-21T10:57'),
  mentions: '4e7ffb2e-a323-41a8-9997-cb61b2789375',
};

export const sampleWithNewData: NewComment = {
  parentType: 'metabolise pish jubilant',
  parentId: '8af6083c-b22b-494d-8645-cac06d2ea076',
  userId: '115d9131-4409-426d-a986-2c83f6a4ee40',
  content: '../fake-data/blob/hipster.txt',
  createdAt: dayjs('2025-04-21T20:13'),
  updatedAt: dayjs('2025-04-21T21:44'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
