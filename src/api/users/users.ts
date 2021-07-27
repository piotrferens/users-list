import { api } from '../api';

import { Users } from './users.types';

export const fetchUsers = () => api.get<Users[]>('/users').then(({ data }) => data);
