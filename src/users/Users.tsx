import { ChangeEvent } from 'react';

import { UsersProps } from './Users.types';

export const Users = ({ users, onUsersSearch, searchPhrase }: UsersProps): JSX.Element => {
  const handleChange = ({ target: { value: searchPhrase } }: ChangeEvent<HTMLInputElement>) => {
    onUsersSearch(searchPhrase);
  };

  return (
    <div>
      {users ? (
        <div>
          <input type="text" onChange={handleChange} value={searchPhrase} />
          {users.length ? (
            users.map((user, index) => (
              <p key={user.id}>
                {index + 1}. {user.name} @{user.email}
              </p>
            ))
          ) : (
            <div>No results</div>
          )}
        </div>
      ) : (
        <div>
          <p>Something went wrong refetch</p>
          <button>Refetch</button>
        </div>
      )}
    </div>
  );
};
