import { ChangeEvent } from 'react';

import { StatusState, UsersProps } from './Users.types';

export const Users = ({
  users,
  onUsersSearch,
  searchPhrase,
  onClick,
  status,
}: UsersProps): JSX.Element => {
  const handleChange = ({ target: { value: searchPhrase } }: ChangeEvent<HTMLInputElement>) => {
    onUsersSearch(searchPhrase);
  };

  return (
    <div>
      {users && (status === StatusState.Idle || status === StatusState.Success) ? (
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
      ) : status === StatusState.Loading ? (
        <div data-testid="users-loader">Loading...</div>
      ) : (
        <div>
          <p>Something went wrong</p>
          <button onClick={onClick}>Refetch</button>
        </div>
      )}
    </div>
  );
};
