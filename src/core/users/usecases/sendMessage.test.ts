import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { dependenciesStore } from '../../dependencies/dependencies.store';
import { mockAllDependencies } from '../../tests/mockDependencies';
import { when } from 'vitest-when';
import { sendMessage } from './sendMessage';

describe('Send message', () => {
  const dependencies = mockAllDependencies();
  const { setDependencies } = dependenciesStore.getState();

  beforeAll(() => {
    setDependencies(dependencies);
  });

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('Should return true if userEmail is valid and message is not empty', async () => {
    // Arrange
    const email = 'toto@gmail.com';
    const message = 'Bonjour';
    when(dependencies.userRepository.sendMessage).calledWith(email, message).thenResolve(true);

    // Act
    const result = await sendMessage(email, message);

    // Assert
    expect(result).toBeTruthy();
    expect(dependencies.userRepository.sendMessage).toBeCalledWith(email, message);
  });

  it('Should return false if userEmail is not valid', async () => {
    // Arrange
    const email = 'tot';
    const message = 'Bonjour';

    // Act
    const result = await sendMessage(email, message);

    // Assert
    expect(result).toBeFalsy();
  });

  it('Should return false if message is empty', async () => {
    // Arrange
    const email = 'toto@gmail.com';
    const message = '';

    // Act
    const result = await sendMessage(email, message);

    // Assert
    expect(result).toBeFalsy();
  });
});
