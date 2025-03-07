import { User } from '../../models/user.model';

export type UserEntity = {
  gender: 'male' | 'female' | 'non-binary';
  name: {
    first: string;
    last: string;
  };
  email: string;
  picture: {
    thumbnail: string;
  };
};

export type UsersEntity = {
  results: UserEntity[];
};

export const mapUserEntityToUser = (userEntity: UserEntity): User => {
  return {
    gender: userEntity.gender,
    firstname: userEntity.name.first,
    lastname: userEntity.name.last,
    email: userEntity.email,
    picture: userEntity.picture.thumbnail
  };
};
