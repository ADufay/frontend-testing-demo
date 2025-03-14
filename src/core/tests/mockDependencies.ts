import { vi } from 'vitest';
import { HttpConnector } from '../connectors/Http/http.connector.interface';
import { Dependencies } from '../dependencies/dependencies.model';
import { UserRepositoryImpl } from '../users/repositories/user.repository';
import { UserRepository } from '../users/repositories/user.repository.interface';

export const mockConnectorDependencies = (): Dependencies => {
  const httpConnector: HttpConnector = {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    put: vi.fn(),
    delete: vi.fn()
  };

  const userRepository = new UserRepositoryImpl(httpConnector);

  return { httpConnector, userRepository };
};

export const mockAllDependencies = (): Dependencies => {
  const httpConnector: HttpConnector = {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    put: vi.fn(),
    delete: vi.fn()
  };

  const userRepository: UserRepository = {
    getUsers: vi.fn(),
    sendMessage: vi.fn()
  };

  return { httpConnector, userRepository };
};
