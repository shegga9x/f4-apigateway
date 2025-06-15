import dayjs from 'dayjs/esm';

import { IUser, NewUser } from './user.model';

export const sampleWithRequiredData: IUser = {
  id: 'cdbac2c8-5af0-4c05-9390-f838bceaee96',
  username: 'swill lumbering',
  email: 'Laurie.Erdman13@hotmail.com',
  passwordHash: 'flat pfft which',
  createdAt: dayjs('2025-06-13T18:09'),
  keycloakUserId: '13ac903b-d8c0-4ac9-8763-8cc1d6650465',
};

export const sampleWithPartialData: IUser = {
  id: '09076bdf-799b-4280-a46d-d5d1b0596d4e',
  username: 'conceptualize',
  email: 'Chloe_Harris82@yahoo.com',
  passwordHash: 'accountability coagulate strictly',
  createdAt: dayjs('2025-06-13T17:18'),
  keycloakUserId: '33663833-200d-4b36-8deb-9f23420b6b7d',
};

export const sampleWithFullData: IUser = {
  id: '2c184532-359e-417e-8339-7736058f89c7',
  username: 'duh very',
  email: 'Bradly.Hansen18@yahoo.com',
  passwordHash: 'ew foot',
  createdAt: dayjs('2025-06-14T02:14'),
  keycloakUserId: '77c65ee3-c295-43ac-be25-0b6d0bec5b1f',
};

export const sampleWithNewData: NewUser = {
  username: 'mostly crystallize gym',
  email: 'Eunice.Schmitt-Lehner@yahoo.com',
  passwordHash: 'till hm',
  createdAt: dayjs('2025-06-13T17:49'),
  keycloakUserId: '4309161e-96d5-49dc-9770-9fb6e9eae7f0',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
