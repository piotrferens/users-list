import { User as UserTypes } from '../../api';
import { primaryTextStyles } from '../../shared/styles';

import { User } from './User';

interface UsersListProps {
  users: UserTypes[];
}

export const UsersList = ({ users }: UsersListProps) => (
  <div>
    {users.length ? (
      users.map((user, index) => (
        <User key={user.id} count={index + 1} name={user.name} email={user.email} />
      ))
    ) : (
      <h3 css={primaryTextStyles}>No results</h3>
    )}
  </div>
);
