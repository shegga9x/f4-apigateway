import dayjs from 'dayjs/esm';

import { ILike, NewLike } from './like.model';

export const sampleWithRequiredData: ILike = {
  id: 'a742bfa1-bb00-4b29-ad52-0269a9261c48',
  reelId: '67a7dd27-7772-408a-acb6-c9945efeb7ed',
  userId: '03b5d304-c2c6-479a-b138-43a8da99f5aa',
  createdAt: dayjs('2025-06-14T03:51'),
};

export const sampleWithPartialData: ILike = {
  id: '69a84668-9bf5-4485-aa01-fdb1efd811e2',
  reelId: 'ad890dce-054f-4a1b-8942-3fce6d17f4e3',
  userId: '0508580f-3187-4a02-8e1c-261b7d68a397',
  createdAt: dayjs('2025-06-13T22:35'),
};

export const sampleWithFullData: ILike = {
  id: '27c6a672-4678-4273-99d5-a79b70984484',
  reelId: 'd9f660ea-5907-4b94-afd4-7555e7c260a8',
  userId: '4affb531-2c0f-4e68-8297-cc46691e6802',
  createdAt: dayjs('2025-06-14T01:08'),
};

export const sampleWithNewData: NewLike = {
  reelId: '3e8c8be7-82dc-4692-b6f2-2ed4ed07afcb',
  userId: '72bd3247-98c3-4a46-87fc-927ebf16cad3',
  createdAt: dayjs('2025-06-14T05:03'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
