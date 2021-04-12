import { Request, Response, NextFunction } from 'express';

import { AppError } from '@shared/infra/http/errors/AppError';

import { UsersRepositoryPostgres } from '@modules/accounts/infra/typeorm/repositories/postgres/UsersRepository';

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { id } = request.user;

  const usersRepository = new UsersRepositoryPostgres();

  const user = await usersRepository.findById(id);

  if (!user.isAdmin) {
    throw new AppError("User isn't admin!", 403);
  }

  return next();
}
