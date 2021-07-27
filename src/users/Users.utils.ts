import { User } from '../api';

export const findUsers = ({ users, searchPhrase }: { users: User[]; searchPhrase: string }) =>
  users.filter(({ name }) => name.toLowerCase().includes(searchPhrase.toLowerCase()));
