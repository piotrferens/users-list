import { findUsers } from './Users.utils';

describe('findUsers', () => {
  it('finds users with given phrase', () => {
    expect(
      findUsers({
        users: [
          { id: 1, name: 'ToM' },
          { id: 2, name: 'RoM' },
          { id: 3, name: 'Bob' },
        ],
        searchPhrase: 'om',
      }),
    ).toEqual([
      { id: 1, name: 'ToM' },
      { id: 2, name: 'RoM' },
    ]);
    expect(
      findUsers({
        users: [
          { id: 1, name: 'JOHN' },
          { id: 2, name: 'ROB' },
          { id: 3, name: 'BOB' },
        ],
        searchPhrase: 'oB',
      }),
    ).toEqual([
      { id: 2, name: 'ROB' },
      { id: 3, name: 'BOB' },
    ]);
  });
});
