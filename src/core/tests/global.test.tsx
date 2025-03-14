import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import App from '../../App';
import { when } from 'vitest-when';
import { dependenciesStore } from '../dependencies/dependencies.store';
import { mockConnectorDependencies } from './mockDependencies';
import { UsersEntity } from '../users/repositories/entities/user.entity';
import { whenClickOnSubmitButton } from './test.fixture';

describe('App', () => {
  const mockFunction = vi.fn();

  const dependencies = mockConnectorDependencies();
  const { setDependencies } = dependenciesStore.getState();

  beforeAll(() => {
    setDependencies(dependencies);
  });

  it('renders the App component', async () => {
    // Arrange
    const usersResult: UsersEntity = {
      results: [
        {
          gender: 'male',
          name: {
            first: 'Anthony',
            last: 'Dufay'
          },
          email: 'toto@gmail.com',
          picture: {
            thumbnail: ''
          }
        }
      ]
    };
    when(dependencies.httpConnector.get).calledWith('https://randomuser.me/api/?results=10').thenResolve(usersResult);

    // Act
    render(<App />);
    const button = await screen.findByTestId('select-user-toto@gmail.com');
    await userEvent.click(button);
    const input = await screen.findByTestId('input');
    await userEvent.type(input, 'Hello');
    await whenClickOnSubmitButton();

    // Assert
    expect(await screen.findByText('Envoyez un message à Anthony:')).toBeInTheDocument();
    expect(dependencies.httpConnector.post).toBeCalledTimes(1);
  });

  it('should show title', () => {
    render(<App />);
    expect(screen.getByRole('heading')).toHaveTextContent('Liste des utilisateurs');
  });

  it('Works with mock', () => {
    when(mockFunction).calledWith(1, 2).thenReturn('Hello');

    expect(mockFunction(1, 2)).toEqual('Hello');
  });
});
