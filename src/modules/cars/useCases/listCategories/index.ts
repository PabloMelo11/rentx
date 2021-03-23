import { PostgresCategoriesRepository } from '../../repositories/implementations/PostgresCategoriesRepository';
import { ListCategoiresUseCase } from './ListCategoiresUseCase';
import { ListCategoriesController } from './ListCategoriesController';

const categoriesRepository = null;
const listCategoriesUseCase = new ListCategoiresUseCase(categoriesRepository);
const listCategoriesController = new ListCategoriesController(
  listCategoriesUseCase,
);

export { listCategoriesController };
