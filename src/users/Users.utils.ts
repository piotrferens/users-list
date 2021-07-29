export function findUsers<T extends { name: string }>({
  users,
  searchPhrase,
}: {
  users: T[];
  searchPhrase: string;
}) {
  return users.filter(({ name }) => name.toLowerCase().includes(searchPhrase.toLowerCase()));
}
