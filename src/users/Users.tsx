import { css } from '@emotion/react';

import { EmptyList } from './components/EmptyList';
import { Input } from './components/Input';
import { Layout } from './components/Layout';
import { Loader } from './components/Loader';
import { UsersList } from './components/UsersList';
import { StatusState, UsersProps } from './Users.types';

const inputStyles = css`
  margin-bottom: 24px;
`;

export const Users = ({
  users,
  onUsersSearch,
  searchPhrase,
  onRefetch,
  status,
}: UsersProps): JSX.Element => (
  <Layout>
    <h1>Users list</h1>
    {users && (status === StatusState.Idle || status === StatusState.Success) ? (
      <div>
        <Input
          value={searchPhrase}
          onChange={onUsersSearch}
          placeholder="Find users"
          css={inputStyles}
        />
        <UsersList users={users} />
      </div>
    ) : status === StatusState.Loading ? (
      <Loader />
    ) : (
      <EmptyList onRefetch={onRefetch} />
    )}
  </Layout>
);
