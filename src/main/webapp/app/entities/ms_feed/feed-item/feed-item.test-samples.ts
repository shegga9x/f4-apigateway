import dayjs from 'dayjs/esm';

import { IFeedItem, NewFeedItem } from './feed-item.model';

export const sampleWithRequiredData: IFeedItem = {
  id: '501137a3-c5a9-43d9-a569-39a8b37939c2',
  userId: '1eff107c-a651-46cb-890d-c2658c52ce73',
  createdAt: dayjs('2025-04-21T22:41'),
  updatedAt: dayjs('2025-04-21T07:40'),
};

export const sampleWithPartialData: IFeedItem = {
  id: '816af3c7-bd47-471f-8d7d-cc7743949d5b',
  userId: '857f22ff-8bb0-4437-8124-e8662c43fac1',
  content: '../fake-data/blob/hipster.txt',
  videoUrl: 'who measly',
  visibility: 'FRIENDS_ONLY',
  location: 'powerless yum',
  likesCount: 10566,
  commentsCount: 394,
  sharesCount: 23861,
  createdAt: dayjs('2025-04-21T15:15'),
  updatedAt: dayjs('2025-04-21T06:34'),
};

export const sampleWithFullData: IFeedItem = {
  id: 'ff910d72-f5b0-4aad-9aa9-96c07d367481',
  userId: '0785f679-5316-4c8d-bf9c-e9091493bd4f',
  content: '../fake-data/blob/hipster.txt',
  imageUrl: 'phew',
  videoUrl: 'colorfully',
  visibility: 'FRIENDS_ONLY',
  location: 'cheerfully',
  likesCount: 5979,
  commentsCount: 27986,
  sharesCount: 32515,
  createdAt: dayjs('2025-04-21T13:03'),
  updatedAt: dayjs('2025-04-21T06:23'),
};

export const sampleWithNewData: NewFeedItem = {
  userId: 'dbdf9a51-7687-444e-b42f-6c8b4506cdfd',
  createdAt: dayjs('2025-04-22T03:26'),
  updatedAt: dayjs('2025-04-22T04:22'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
