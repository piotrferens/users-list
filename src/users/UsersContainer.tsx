import { useRouter } from 'next/router';
import { useState } from 'react';

import { fetchUsers } from '../api';

import { Users } from './Users';
import { searchUsersAction, fetchUsersAction } from './Users.actions';
import { useUsersDispatch, useUsersState } from './Users.hooks';
import { StatusState } from './Users.types';

export const UsersContainer = (): JSX.Element => {
  const { searchedUsers, searchPhrase } = useUsersState();
  const dispatchUsers = useUsersDispatch();
  const router = useRouter();
  const [status, setStatus] = useState<StatusState>(StatusState.Idle);

  const handleSearchUsers = (searchPhrase: string) => {
    dispatchUsers(searchUsersAction({ searchPhrase }));

    if (!searchPhrase && router.query.user) {
      router.push({ pathname: '/' }, undefined, { shallow: true });
      return;
    }

    router.push({ pathname: '/', query: { user: searchPhrase } }, undefined, { shallow: true });
  };

  const handleFetchUsers = async () => {
    try {
      setStatus(StatusState.Loading);

      const users = await fetchUsers();

      const searchPhrase = router.query?.user as string | undefined;

      dispatchUsers(fetchUsersAction({ users, searchPhrase }));

      setStatus(StatusState.Success);
    } catch {
      setStatus(StatusState.Error);
    }
  };

  return (
    <Users
      searchPhrase={searchPhrase}
      users={searchedUsers}
      onUsersSearch={handleSearchUsers}
      onClick={handleFetchUsers}
      status={status}
    />
  );
};
