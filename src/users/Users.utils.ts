import { Users } from '../api';

export const findUsers = ({ users, searchPhrase }: { users: Users[]; searchPhrase: string }) =>
  users.filter(({ name }) => name.toLowerCase().includes(searchPhrase.toLowerCase()));
