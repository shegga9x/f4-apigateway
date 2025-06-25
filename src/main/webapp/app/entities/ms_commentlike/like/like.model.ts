import dayjs from 'dayjs/esm';

export interface ILike {
  id: string;
  parentType?: string | null;
  parentId?: string | null;
  userId?: string | null;
  createdAt?: dayjs.Dayjs | null;
}

export type NewLike = Omit<ILike, 'id'> & { id: null };
