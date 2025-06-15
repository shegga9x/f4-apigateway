import dayjs from 'dayjs/esm';

import { IFeedItem, NewFeedItem } from './feed-item.model';

export const sampleWithRequiredData: IFeedItem = {
  id: '501137a3-c5a9-43d9-a569-39a8b37939c2',
  userId: '1eff107c-a651-46cb-890d-c2658c52ce73',
  reelId: 'b10520b8-06b0-4ce7-b463-fe179e1a986d',
  timestamp: dayjs('2025-06-14T06:22'),
};

export const sampleWithPartialData: IFeedItem = {
  id: '2a213731-816a-4f3c-97bd-4771fd7dcc77',
  userId: '3949d5b2-857f-422f-8f8b-b0437124e866',
  reelId: 'c43fac11-71ef-4454-ae94-747f8c89abeb',
  timestamp: dayjs('2025-06-14T02:07'),
};

export const sampleWithFullData: IFeedItem = {
  id: 'ff910d72-f5b0-4aad-9aa9-96c07d367481',
  userId: '0785f679-5316-4c8d-bf9c-e9091493bd4f',
  reelId: '59ff3bfc-0900-4ac3-a1f4-a96f0212df50',
  timestamp: dayjs('2025-06-14T04:10'),
};

export const sampleWithNewData: NewFeedItem = {
  userId: 'dbdf9a51-7687-444e-b42f-6c8b4506cdfd',
  reelId: 'ef48ca2c-91bc-4080-a9a8-495b337bcc73',
  timestamp: dayjs('2025-06-13T22:25'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
