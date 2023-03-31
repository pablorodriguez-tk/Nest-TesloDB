import {
  ExecutionContext,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';
import { User } from '../entities/user.entity';

type UserKeys = keyof User;

export const GetUser = createParamDecorator(
  (keys: UserKeys[], ctx: ExecutionContext): User | Partial<User> => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new InternalServerErrorException('User not found (request)');
    }

    if (!keys || !keys.length) {
      return user;
    }

    const filteredUser = keys.reduce((acc, key) => {
      if (key in user) {
        acc[key] = user[key];
      }
      return acc;
    }, {});

    return filteredUser;
  },
);
