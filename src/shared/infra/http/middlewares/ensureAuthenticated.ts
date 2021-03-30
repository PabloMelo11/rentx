import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '@shared/errors/AppError';

import { UsersRepositoryPostgres } from '@modules/accounts/infra/typeorm/repositories/postgres/UsersRepository';

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
    throw new AppError('Token missing', 401);
  }

  const [_, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, '1121200616PaGoThe2Us') as IPayload;

    const usersRepository = new UsersRepositoryPostgres();

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exists', 401);
    }

    request.user = {
      id: user_id,
    };

    next();
  } catch {
    throw new AppError('Invalid token', 401);
  }
}
