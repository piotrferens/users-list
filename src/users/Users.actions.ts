import { User } from '../api';

export const SEARCH_USERS = 'users/search-users';
export const FETCH_USER = 'users/fetch-users';

type SearchUsersPayload = { searchPhrase: string };
type FetchUsersPayload = { users: User[]; searchPhrase?: string };

export type SearchUsers = { type: typeof SEARCH_USERS; payload: SearchUsersPayload };
export type FetchUsers = {
  type: typeof FETCH_USER;
  payload: FetchUsersPayload;
};

export type UsersActions = SearchUsers | FetchUsers;

export const searchUsersAction = ({ searchPhrase }: SearchUsersPayload): SearchUsers => ({
  type: SEARCH_USERS,
  payload: { searchPhrase },
});

export const fetchUsersAction = ({ users, searchPhrase }: FetchUsersPayload): FetchUsers => ({
  type: FETCH_USER,
  payload: { users, searchPhrase },
});
