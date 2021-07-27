import { useRouter } from 'next/router';

import { Users } from './Users';
import { searchUsers } from './Users.actions';
import { useUsersDispatch, useUsersState } from './Users.hooks';

export const UsersContainer = (): JSX.Element => {
  const { searchedUsers, searchPhrase } = useUsersState();
  const dispatchUsers = useUsersDispatch();
  const { push, query } = useRouter();

  const handleSearchUsers = (searchPhrase: string) => {
    dispatchUsers(searchUsers({ searchPhrase }));

    if (!searchPhrase && query.user) {
      push({ pathname: '/' }, { pathname: '/' }, { shallow: true });
      return;
    }

    const url = { pathname: '/', query: { user: searchPhrase } };
    push(url, url, { shallow: true });
  };

  return (
    <Users searchPhrase={searchPhrase} users={searchedUsers} onUsersSearch={handleSearchUsers} />
  );
};
