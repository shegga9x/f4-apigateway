import dayjs from 'dayjs/esm';

export interface IUser {
  id: string;
  username?: string | null;
  email?: string | null;
  passwordHash?: string | null;
  createdAt?: dayjs.Dayjs | null;
  keycloakUserId?: string | null;
  userAvatar?: string | null;
}

export type NewUser = Omit<IUser, 'id'> & { id: null };
