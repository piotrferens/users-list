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
          <input
            type="text"
            onChange={handleChange}
            value={searchPhrase}
            data-testid="search-users-input"
          />
          <div>
            {users.length ? (
              users.map((user, index) => (
                <div key={user.id}>
                  <span>{index + 1}.</span> <span>{user.name}</span> <span>@{user.email}</span>
                </div>
              ))
            ) : (
              <div>No results</div>
            )}
          </div>
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
