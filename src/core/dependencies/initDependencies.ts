import { JSONHttpConnectorImpl } from '../connectors/Http/http.connector';
import { UserRepositoryImpl } from '../users/repositories/user.repository';
import { Dependencies } from './dependencies.model';

export const initDependencies = (): Dependencies => {
  const httpConnector = new JSONHttpConnectorImpl();
  const userRepository = new UserRepositoryImpl(httpConnector);

  return {
    httpConnector,
    userRepository
  };
};
