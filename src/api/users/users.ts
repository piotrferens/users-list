import { api } from '../api';

import { User } from './users.types';

export const fetchUsers = () => api.get<User[]>('/users').then(({ data }) => data);
