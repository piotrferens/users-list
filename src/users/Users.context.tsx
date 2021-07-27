import { createContext, Dispatch, useReducer } from 'react';

import { UsersActions } from './Users.actions';
import { usersReducer } from './Users.reducer';
import { UsersContextControllerProps, UsersState } from './Users.types';

export const UsersStateContext = createContext<UsersState | null>(null);
export const UsersDispatchContext = createContext<Dispatch<UsersActions> | null>(null);

export const UsersContextController = ({
  allUsers,
  searchedUsers,
  searchPhrase,
  children,
}: UsersContextControllerProps) => {
  const [usersState, dispatch] = useReducer(usersReducer, {
    allUsers,
    searchedUsers,
    searchPhrase,
  });

  return (
    <UsersStateContext.Provider value={usersState}>
      <UsersDispatchContext.Provider value={dispatch}>{children}</UsersDispatchContext.Provider>
    </UsersStateContext.Provider>
  );
};
