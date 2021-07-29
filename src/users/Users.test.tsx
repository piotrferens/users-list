/* eslint @typescript-eslint/no-non-null-assertion: 0 */
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import router from 'next/router';

import UsersPage from 'src/pages/index';

import * as users from '../api/users/users';
import { userFactory } from '../api/users/users.mocks';

jest.mock('next/router', () => require('next-router-mock'));

describe('UsersPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(async () => {
    await act(async () => {
      await router.push({ pathname: '/' });
    });
  });

  it('render users page with query user in url', async () => {
    const pageProps = {
      allUsers: [
        userFactory({ id: 1, name: 'Adam Warzecha' }),
        userFactory({ id: 2, name: 'Tomek Skiba' }),
        userFactory({ id: 3, name: 'Tomek Test' }),
      ],
      searchedUsers: [
        userFactory({ id: 2, name: 'Tomek Skiba' }),
        userFactory({ id: 3, name: 'Tomek Test' }),
      ],
      searchPhrase: 'tom',
    };

    await router.push({ pathname: '/', query: { user: 'tom' } });

    const page = UsersPage.meta!.renderLayout({
      page: <UsersPage />,
      pageProps,
    });

    render(page);

    const searchInput = screen.getByTestId('search-users-input') as HTMLInputElement;

    expect(searchInput.value).toBe('tom');
    expect(screen.getByText('Tomek Skiba')).toBeInTheDocument();
    expect(screen.queryByText('Adam Warzecha')).toBeNull();
    expect(router).toMatchObject({
      asPath: `/?user=${'tom'}`,
      pathname: '/',
      query: { user: 'tom' },
    });
  });

  it('searches through users', () => {
    const pageProps = {
      allUsers: [
        userFactory({ id: 1, name: 'Adam Warzecha' }),
        userFactory({ id: 2, name: 'Tomek Skiba' }),
        userFactory({ id: 3, name: 'Tomek Test' }),
        userFactory({ id: 4, name: 'Adam Test' }),
      ],
      searchedUsers: [
        userFactory({ id: 1, name: 'Adam Warzecha' }),
        userFactory({ id: 2, name: 'Tomek Skiba' }),
        userFactory({ id: 3, name: 'Tomek Test' }),
        userFactory({ id: 4, name: 'Adam Test' }),
      ],
      searchPhrase: '',
    };

    const page = UsersPage.meta!.renderLayout({
      page: <UsersPage />,
      pageProps,
    });

    render(page);

    const searchInput = screen.getByTestId('search-users-input') as HTMLInputElement;

    fireEvent.change(searchInput, { target: { value: 'adam' } });

    expect(router).toMatchObject({
      asPath: '/?user=adam',
      pathname: '/',
      query: { user: 'adam' },
    });

    expect(screen.getByText('Adam Warzecha')).toBeInTheDocument();
    expect(screen.queryByText('Tomek Skiba')).not.toBeInTheDocument();
  });

  it('displays message notice when there is no results after first render', () => {
    const pageProps = {
      allUsers: [
        userFactory({ id: 1, name: 'Adam Warzecha' }),
        userFactory({ id: 2, name: 'Tomek Skiba' }),
        userFactory({ id: 3, name: 'Tomek Test' }),
        userFactory({ id: 4, name: 'Adam Test' }),
      ],
      searchedUsers: [],
      searchPhrase: 'john',
    };

    const page = UsersPage.meta!.renderLayout({
      page: <UsersPage />,
      pageProps,
    });

    render(page);

    const searchInput = screen.getByTestId('search-users-input') as HTMLInputElement;

    expect(searchInput.value).toBe('john');
    expect(screen.getByText('No results')).toBeInTheDocument();
    expect(screen.queryByText('Tomek Skiba')).not.toBeInTheDocument();
  });

  it('displays message notice when there is no results after searching', () => {
    const pageProps = {
      allUsers: [
        userFactory({ id: 1, name: 'Adam Warzecha' }),
        userFactory({ id: 2, name: 'Tomek Skiba' }),
        userFactory({ id: 3, name: 'Tomek Test' }),
        userFactory({ id: 4, name: 'Adam Test' }),
      ],
      searchedUsers: [
        userFactory({ id: 1, name: 'Adam Warzecha' }),
        userFactory({ id: 2, name: 'Tomek Skiba' }),
        userFactory({ id: 3, name: 'Tomek Test' }),
        userFactory({ id: 4, name: 'Adam Test' }),
      ],
      searchPhrase: '',
    };

    const page = UsersPage.meta!.renderLayout({
      page: <UsersPage />,
      pageProps,
    });

    render(page);

    const searchInput = screen.getByTestId('search-users-input') as HTMLInputElement;

    fireEvent.change(searchInput, { target: { value: 'john' } });

    expect(searchInput.value).toBe('john');
    expect(screen.getByText('No results')).toBeInTheDocument();
    expect(screen.queryByText('Tomek Skiba')).not.toBeInTheDocument();
  });

  it('displays error message there is no users', () => {
    const pageProps = {
      allUsers: null,
      searchedUsers: null,
      searchPhrase: '',
    };

    const page = UsersPage.meta!.renderLayout({
      page: <UsersPage />,
      pageProps,
    });

    render(page);

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Refetch')).toBeInTheDocument();
  });

  it('refetches users when error occurs and displays loading message', async () => {
    const pageProps = {
      allUsers: null,
      searchedUsers: null,
      searchPhrase: '',
    };

    const page = UsersPage.meta!.renderLayout({
      page: <UsersPage />,
      pageProps,
    });

    render(page);

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Refetch')).toBeInTheDocument();

    const refetch = screen.getByText('Refetch');

    jest.spyOn(users, 'fetchUsers').mockResolvedValueOnce([userFactory({ id: 1, name: 'Vader' })]);

    fireEvent.click(refetch);
    expect(screen.queryByText('Loading...')).toBeInTheDocument();

    await waitFor(() => screen.getByText('Vader'));

    expect(screen.getByText('Vader')).toBeInTheDocument();
    expect(screen.queryByText('Something went wrong')).toBeNull();
    expect(screen.queryByText('Refetch')).toBeNull();
    expect(screen.queryByText('Loading...')).toBeNull();
  });
});
