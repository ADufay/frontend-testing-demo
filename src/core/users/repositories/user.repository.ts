import { HttpConnector } from '../../connectors/Http/http.connector.interface';
import { User } from '../models/user.model';
import { mapUserEntityToUser, UsersEntity } from './entities/user.entity';
import { UserRepository } from './user.repository.interface';

export class UserRepositoryImpl implements UserRepository {
  private readonly httpConnector: HttpConnector;

  constructor(httpConnector: HttpConnector) {
    this.httpConnector = httpConnector;
  }

  getUsers = async (): Promise<User[]> => {
    console.log(await this.httpConnector.get('https://randomuser.me/api/?results=10'));

    const usersEntity = (await this.httpConnector.get('https://randomuser.me/api/?results=10')) as UsersEntity;

    return usersEntity.results.map(mapUserEntityToUser);
  };

  sendMessage = async (userEmail: string, message: string): Promise<boolean> => {
    this.httpConnector.post('http://localhost:8080', { email: userEmail, message });
    return true;
  };
}
