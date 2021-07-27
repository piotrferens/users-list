export const SEARCH_USERS = 'users/search-users';
export type SearchUsers = { type: typeof SEARCH_USERS; payload: { searchPhrase: string } };

export type UsersActions = SearchUsers;

export const searchUsers = ({ searchPhrase }: { searchPhrase: string }): SearchUsers => ({
  type: SEARCH_USERS,
  payload: { searchPhrase },
});
