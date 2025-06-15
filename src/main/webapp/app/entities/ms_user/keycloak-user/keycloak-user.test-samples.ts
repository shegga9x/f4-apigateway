import { IKeycloakUser, NewKeycloakUser } from './keycloak-user.model';

export const sampleWithRequiredData: IKeycloakUser = {
  id: 'd58dd9d9-a168-4a57-8bde-5db3addaf1a1',
  username: 'mythology unit',
  email: 'Antonia6@hotmail.com',
  realmId: '505f1582-1b15-4fc7-8b65-8d1212c7dfb1',
  userId: '382bb88d-3975-4a03-a6b2-9dc9376f58f6',
};

export const sampleWithPartialData: IKeycloakUser = {
  id: '3479311a-0e72-43ce-8cae-ca671147f649',
  username: 'where',
  email: 'Alia_Gerlach41@gmail.com',
  realmId: '4676be7c-1cd0-46d7-a2e9-1f9d2665dc78',
  userId: '5d20cf60-fdd3-4ad7-b8b1-3f23020aa8e4',
};

export const sampleWithFullData: IKeycloakUser = {
  id: 'c4ae97c5-dbeb-45fb-b566-d010caedad6d',
  username: 'publication squeaky',
  email: 'Wilmer25@yahoo.com',
  realmId: '9e76891e-bdc5-45b5-873a-03f4b107ab4d',
  userId: 'c8a2f8d8-f968-472a-9d1c-6aedbce49ccd',
};

export const sampleWithNewData: NewKeycloakUser = {
  username: 'sophisticated kindly',
  email: 'Mary_Kihn@hotmail.com',
  realmId: '951a14b3-3b63-474e-b806-dcdda509c049',
  userId: '6c5b71e7-2fc2-420e-b083-7a86d7dcdf79',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
