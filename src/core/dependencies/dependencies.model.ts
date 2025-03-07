import { HttpConnector } from '../connectors/Http/http.connector.interface';
import { UserRepository } from '../users/repositories/user.repository.interface';

export type Dependencies = {
  httpConnector: HttpConnector;
  userRepository: UserRepository;
};
