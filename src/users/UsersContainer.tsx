import { useRouter } from 'next/router';

import { Users } from './Users';
import { searchUsers } from './Users.actions';
import { useUsersDispatch, useUsersState } from './Users.hooks';

export const UsersContainer = (): JSX.Element => {
  const { searchedUsers, searchPhrase } = useUsersState();
  const dispatchUsers = useUsersDispatch();
  const router = useRouter();

  const handleSearchUsers = (searchPhrase: string) => {
    dispatchUsers(searchUsers({ searchPhrase }));

    if (!searchPhrase && router.query.user) {
      router.push({ pathname: '/' }, { pathname: '/' }, { shallow: true });
      return;
    }

    const url = { pathname: '/', query: { user: searchPhrase } };
    router.push(url, url, { shallow: true });
  };

  return (
    <Users searchPhrase={searchPhrase} users={searchedUsers} onUsersSearch={handleSearchUsers} />
  );
};
