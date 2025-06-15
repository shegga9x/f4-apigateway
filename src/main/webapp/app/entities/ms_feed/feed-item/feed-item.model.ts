import dayjs from 'dayjs/esm';

export interface IFeedItem {
  id: string;
  userId?: string | null;
  reelId?: string | null;
  timestamp?: dayjs.Dayjs | null;
}

export type NewFeedItem = Omit<IFeedItem, 'id'> & { id: null };
