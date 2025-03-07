import { dependenciesStore } from '../../dependencies/dependencies.store';

const isEmailValid = (email: string): boolean => {
  return email.includes('@');
};

export const sendMessage = async (userEmail: string | undefined, message: string): Promise<boolean> => {
  const { dependencies } = dependenciesStore.getState();

  if (!userEmail || !isEmailValid(userEmail) || message === '') {
    return false;
  }

  return dependencies.userRepository.sendMessage(userEmail, message);
};
