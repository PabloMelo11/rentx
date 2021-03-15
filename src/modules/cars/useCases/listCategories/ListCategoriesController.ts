import { Request, Response } from 'express';

import { ListCategoiresUseCase } from './ListCategoiresUseCase';

class ListCategoriesController {
  constructor(private listCategoriesUseCase: ListCategoiresUseCase) {}

  handle(request: Request, response: Response): Response {
    const all = this.listCategoriesUseCase.execute();

    return response.json(all);
  }
}

export { ListCategoriesController };
