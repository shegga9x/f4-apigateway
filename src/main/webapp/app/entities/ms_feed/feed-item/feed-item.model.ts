import dayjs from 'dayjs/esm';
import { FeedVisibility } from 'app/entities/enumerations/feed-visibility.model';

export interface IFeedItem {
  id: string;
  userId?: string | null;
  content?: string | null;
  imageUrl?: string | null;
  videoUrl?: string | null;
  visibility?: keyof typeof FeedVisibility | null;
  location?: string | null;
  likesCount?: number | null;
  sharesCount?: number | null;
  createdAt?: dayjs.Dayjs | null;
  updatedAt?: dayjs.Dayjs | null;
}

export type NewFeedItem = Omit<IFeedItem, 'id'> & { id: null };
