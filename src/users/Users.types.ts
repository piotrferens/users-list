import { InferGetServerSidePropsType } from 'next';
import { ReactNode } from 'react';

import { LayoutProps } from '../createPage';

import { getUsersServerSideProps } from './getUsersServerSideProps';

type UsersServerSideProps = InferGetServerSidePropsType<typeof getUsersServerSideProps>;

type UsersPayload = UsersServerSideProps['allUsers'];

export interface UsersState {
  allUsers: UsersPayload;
  searchedUsers: UsersPayload;
  searchPhrase: string;
}

export type UsersLayoutProps = LayoutProps<UsersServerSideProps>;

export type UsersContextControllerProps = Pick<
  UsersLayoutProps['pageProps'],
  'allUsers' | 'searchedUsers' | 'searchPhrase'
> & {
  children: ReactNode;
};

export interface UsersProps {
  users: UsersPayload;
  onUsersSearch: (searchPhrase: string) => void;
  searchPhrase: string;
}
