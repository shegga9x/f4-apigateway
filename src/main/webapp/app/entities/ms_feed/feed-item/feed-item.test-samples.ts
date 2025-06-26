import dayjs from 'dayjs/esm';

import { IFeedItem, NewFeedItem } from './feed-item.model';

export const sampleWithRequiredData: IFeedItem = {
  id: '501137a3-c5a9-43d9-a569-39a8b37939c2',
  userId: '1eff107c-a651-46cb-890d-c2658c52ce73',
  createdAt: dayjs('2025-04-21T22:41'),
  updatedAt: dayjs('2025-04-21T07:40'),
};

export const sampleWithPartialData: IFeedItem = {
  id: '731816af-3c7b-4d47-b71f-d7dcc7743949',
  userId: '5b2857f2-2ff8-4bb0-a437-124e8662c43f',
  content: '../fake-data/blob/hipster.txt',
  videoUrl: 'yum barring rewarding',
  visibility: 'FRIENDS_ONLY',
  location: 'restfully during doing',
  createdAt: dayjs('2025-04-21T23:54'),
  updatedAt: dayjs('2025-04-21T06:06'),
};

export const sampleWithFullData: IFeedItem = {
  id: 'ff910d72-f5b0-4aad-9aa9-96c07d367481',
  userId: '0785f679-5316-4c8d-bf9c-e9091493bd4f',
  content: '../fake-data/blob/hipster.txt',
  imageUrl: 'phew',
  videoUrl: 'colorfully',
  visibility: 'FRIENDS_ONLY',
  location: 'cheerfully',
  createdAt: dayjs('2025-04-21T09:47'),
  updatedAt: dayjs('2025-04-22T01:54'),
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
