import dayjs from 'dayjs/esm';

import { IFeedItem, NewFeedItem } from './feed-item.model';

export const sampleWithRequiredData: IFeedItem = {
  id: '501137a3-c5a9-43d9-a569-39a8b37939c2',
  userId: '1eff107c-a651-46cb-890d-c2658c52ce73',
  createdAt: dayjs('2025-04-21T22:41'),
  updatedAt: dayjs('2025-04-21T07:40'),
};

export const sampleWithPartialData: IFeedItem = {
  id: '1816af3c-7bd4-4771-afd7-dcc7743949d5',
  userId: '2857f22f-f8bb-4043-8712-4e8662c43fac',
  content: '../fake-data/blob/hipster.txt',
  videoUrl: 'freely',
  visibility: 'FRIENDS_ONLY',
  location: 'smart outstanding',
  likesCount: 20562,
  sharesCount: 23659,
  createdAt: dayjs('2025-04-21T12:00'),
  updatedAt: dayjs('2025-04-21T08:51'),
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
  sharesCount: 27986,
  createdAt: dayjs('2025-04-22T05:13'),
  updatedAt: dayjs('2025-04-21T13:03'),
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
