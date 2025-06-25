import dayjs from 'dayjs/esm';

import { IReel, NewReel } from './reel.model';

export const sampleWithRequiredData: IReel = {
  id: 'defae4b1-2806-410d-8db7-44227075fcaa',
  userId: '5c9a4e51-59f6-4e85-b74e-64bed6b05dd6',
  title: 'out fast',
  videoUrl: 'pace quizzically wallop',
  createdAt: dayjs('2025-04-22T03:54'),
};

export const sampleWithPartialData: IReel = {
  id: '54132751-cde9-4772-a39b-20c9cccad8f1',
  userId: '4c6d1f00-30df-42dc-8133-e54eb31ced55',
  title: 'oh twine',
  videoUrl: 'unless for for',
  createdAt: dayjs('2025-04-22T02:38'),
};

export const sampleWithFullData: IReel = {
  id: '67c639f7-b756-4ce7-9142-13bc22d03ee2',
  userId: '9c0398ce-7a04-4398-b33c-62679242b32f',
  title: 'who seemingly',
  videoUrl: 'if',
  createdAt: dayjs('2025-04-21T17:24'),
};

export const sampleWithNewData: NewReel = {
  userId: 'b102b6bf-bbc0-4833-b990-5c3c43d250b4',
  title: 'medium',
  videoUrl: 'however obedience er',
  createdAt: dayjs('2025-04-21T11:24'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
