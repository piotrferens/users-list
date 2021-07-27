import { fetchUsers } from '../api';

import { findUsers } from './Users.utils';

export const getUsersServerSideProps = async ({ query }: { query: { user?: string } }) => {
  try {
    const users = await fetchUsers();
    let searchedUsers = null;

    if (query.user) {
      searchedUsers = findUsers({ users, searchPhrase: query.user });
    }

    return {
      props: {
        allUsers: users,
        searchedUsers: searchedUsers || users,
        searchPhrase: query.user || '',
      },
    };
  } catch {
    return {
      props: {
        allUsers: null,
        searchedUsers: null,
        searchPhrase: '',
      },
    };
  }
};
