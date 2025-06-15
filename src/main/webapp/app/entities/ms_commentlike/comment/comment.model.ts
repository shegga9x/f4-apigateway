import dayjs from 'dayjs/esm';

export interface IComment {
  id: string;
  reelId?: string | null;
  userId?: string | null;
  content?: string | null;
  createdAt?: dayjs.Dayjs | null;
}

export type NewComment = Omit<IComment, 'id'> & { id: null };
