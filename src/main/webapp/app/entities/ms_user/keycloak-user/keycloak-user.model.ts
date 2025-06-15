export interface IKeycloakUser {
  id: string;
  username?: string | null;
  email?: string | null;
  realmId?: string | null;
  userId?: string | null;
}

export type NewKeycloakUser = Omit<IKeycloakUser, 'id'> & { id: null };
