import { FETCH_USER, SEARCH_USERS, UsersActions } from './Users.actions';
import { UsersState } from './Users.types';
import { findUsers } from './Users.utils';

export const usersReducer = (state: UsersState, action: UsersActions): UsersState => {
  switch (action.type) {
    case SEARCH_USERS:
      if (!state?.allUsers) return state;

      return {
        ...state,
        searchedUsers: findUsers({
          users: state.allUsers,
          searchPhrase: action.payload.searchPhrase,
        }),
        searchPhrase: action.payload.searchPhrase,
      };
    case FETCH_USER:
      return {
        ...state,
        allUsers: action.payload.users,
        searchedUsers: action.payload.searchPhrase
          ? findUsers({
              users: action.payload.users,
              searchPhrase: action.payload.searchPhrase,
            })
          : action.payload.users,
        searchPhrase: action.payload.searchPhrase ?? '',
      };
    default:
      return state;
  }
};
