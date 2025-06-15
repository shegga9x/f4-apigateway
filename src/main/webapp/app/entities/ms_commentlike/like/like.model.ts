import dayjs from 'dayjs/esm';

export interface ILike {
  id: string;
  reelId?: string | null;
  userId?: string | null;
  createdAt?: dayjs.Dayjs | null;
}

export type NewLike = Omit<ILike, 'id'> & { id: null };
