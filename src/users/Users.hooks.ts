import { useContext } from 'react';

import { UsersStateContext, UsersDispatchContext } from './Users.context';

export const useUsersState = () => {
  const state = useContext(UsersStateContext);

  if (!state) {
    throw new Error('useUsersState must be used within UsersContextController');
  }

  return state;
};

export const useUsersDispatch = () => {
  const dispatch = useContext(UsersDispatchContext);

  if (!dispatch) {
    throw new Error('useUsersDispatch must be used within UsersContextController');
  }

  return dispatch;
};
