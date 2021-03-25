import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { PostgresUsersRepository } from '../modules/accounts/repositories/implementations/PostgresUsersRepository';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('Token missing');
  }

  const [_, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, '1121200616PaGoThe2Us') as IPayload;

    const usersRepository = new PostgresUsersRepository();

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new Error('User does not exists');
    }

    next();
  } catch {
    throw new Error('Invalid token');
  }
}
