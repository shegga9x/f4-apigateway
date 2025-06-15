import dayjs from 'dayjs/esm';

export interface INotification {
  id: string;
  recipientId?: string | null;
  type?: string | null;
  message?: string | null;
  isRead?: boolean | null;
  createdAt?: dayjs.Dayjs | null;
}

export type NewNotification = Omit<INotification, 'id'> & { id: null };
