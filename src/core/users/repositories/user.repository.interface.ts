import { User } from '../models/user.model';

export interface UserRepository {
  getUsers: () => Promise<User[]>;
  sendMessage: (userEmail: string, message: string) => Promise<boolean>;
}
