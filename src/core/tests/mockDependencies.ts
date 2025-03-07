import { vi } from 'vitest';
import { HttpConnector } from '../connectors/Http/http.connector.interface';
import { Dependencies } from '../dependencies/dependencies.model';
import { UserRepositoryImpl } from '../users/repositories/user.repository';

export const mockDependencies = (): Dependencies => {
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
