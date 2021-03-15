import { CategoriesRepository } from '../../repositories/CategoriesRepository';
import { ListCategoiresUseCase } from './ListCategoiresUseCase';
import { ListCategoriesController } from './ListCategoriesController';

const categoriesRepository = new CategoriesRepository();
const listCategoriesUseCase = new ListCategoiresUseCase(categoriesRepository);
const listCategoriesController = new ListCategoriesController(
  listCategoriesUseCase,
);

export { listCategoriesController };
