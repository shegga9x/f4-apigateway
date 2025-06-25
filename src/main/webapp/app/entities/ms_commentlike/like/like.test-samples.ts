import dayjs from 'dayjs/esm';

import { ILike, NewLike } from './like.model';

export const sampleWithRequiredData: ILike = {
  id: 'a742bfa1-bb00-4b29-ad52-0269a9261c48',
  parentType: 'mockingly order',
  parentId: 'cb6c9945-efeb-47ed-ab03-b5d304c2c679',
  userId: '13843a8d-a99f-45aa-aeb9-42d0de4971d7',
  createdAt: dayjs('2025-04-21T17:37'),
};

export const sampleWithPartialData: ILike = {
  id: '69a84668-9bf5-4485-aa01-fdb1efd811e2',
  parentType: 'trek unless',
  parentId: '9423fce6-d17f-44e3-8005-08580f3187a0',
  userId: 'e1c261b7-d68a-4397-9073-4adec97a3168',
  createdAt: dayjs('2025-04-21T08:51'),
};

export const sampleWithFullData: ILike = {
  id: '27c6a672-4678-4273-99d5-a79b70984484',
  parentType: 'petal drug if',
  parentId: 'e7c260a8-94af-4fb5-9312-c0fe68297cc4',
  userId: '691e6802-0974-4dd9-afff-874d5f181da2',
  createdAt: dayjs('2025-04-22T01:29'),
};

export const sampleWithNewData: NewLike = {
  parentType: 'last',
  parentId: '82dc6926-f22e-4d4e-9d07-afcbf72bd324',
  userId: '98c3a467-fc92-47eb-8f16-cad33cfffc4c',
  createdAt: dayjs('2025-04-22T04:03'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
