import dayjs from 'dayjs/esm';

export interface IReel {
  id: string;
  userId?: string | null;
  title?: string | null;
  videoUrl?: string | null;
  createdAt?: dayjs.Dayjs | null;
}

export type NewReel = Omit<IReel, 'id'> & { id: null };
