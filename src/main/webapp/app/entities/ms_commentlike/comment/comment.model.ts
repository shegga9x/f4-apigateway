import dayjs from 'dayjs/esm';

export interface IComment {
  id: string;
  parentType?: string | null;
  parentId?: string | null;
  userId?: string | null;
  content?: string | null;
  createdAt?: dayjs.Dayjs | null;
  updatedAt?: dayjs.Dayjs | null;
  mentions?: string | null;
}

export type NewComment = Omit<IComment, 'id'> & { id: null };
