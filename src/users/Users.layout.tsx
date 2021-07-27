import { UsersContextController } from './Users.context';
import { UsersLayoutProps } from './Users.types';

export const UsersLayout = ({
  page,
  pageProps: { allUsers, searchedUsers, searchPhrase },
}: UsersLayoutProps) => (
  <UsersContextController
    allUsers={allUsers}
    searchedUsers={searchedUsers}
    searchPhrase={searchPhrase}
  >
    {page}
  </UsersContextController>
);

export const getUsersLayout = (layoutProps: UsersLayoutProps) => <UsersLayout {...layoutProps} />;
