import { dependenciesStore } from '../../dependencies/dependencies.store';
import { User } from '../models/user.model';

export const getUsers = async (): Promise<User[]> => {
  const { dependencies } = dependenciesStore.getState();

  return await dependencies.userRepository.getUsers();
};
