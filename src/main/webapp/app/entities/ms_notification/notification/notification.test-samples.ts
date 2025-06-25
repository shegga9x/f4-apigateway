import dayjs from 'dayjs/esm';

import { INotification, NewNotification } from './notification.model';

export const sampleWithRequiredData: INotification = {
  id: '4917d9fb-b873-41d6-981d-153319417462',
  recipientId: '7cbd8e45-bf20-4985-9db0-587406cdd0fb',
  type: 'punctuation indeed',
  message: '../fake-data/blob/hipster.txt',
  isRead: false,
  createdAt: dayjs('2025-04-21T07:49'),
};

export const sampleWithPartialData: INotification = {
  id: 'dc0901a9-6b66-4127-b03c-b490129d6818',
  recipientId: 'a4b101bf-b445-4fad-8589-85d62783af2f',
  type: 'grandpa guzzle till',
  message: '../fake-data/blob/hipster.txt',
  isRead: true,
  createdAt: dayjs('2025-04-21T17:50'),
};

export const sampleWithFullData: INotification = {
  id: '27befbee-c69c-445f-a315-e759c182bfa5',
  recipientId: '073f2df6-7f85-484f-9a6f-41951f414a55',
  type: 'compromise whereas painfully',
  message: '../fake-data/blob/hipster.txt',
  isRead: true,
  createdAt: dayjs('2025-04-21T22:41'),
};

export const sampleWithNewData: NewNotification = {
  recipientId: 'ced2f2c2-e523-4c7f-a107-5024f3ea15f6',
  type: 'whose',
  message: '../fake-data/blob/hipster.txt',
  isRead: false,
  createdAt: dayjs('2025-04-22T05:17'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
