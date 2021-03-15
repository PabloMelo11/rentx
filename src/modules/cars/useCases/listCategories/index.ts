import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import { ListCategoiresUseCase } from './ListCategoiresUseCase';
import { ListCategoriesController } from './ListCategoriesController';

const categoriesRepository = CategoriesRepository.getInstance();
const listCategoriesUseCase = new ListCategoiresUseCase(categoriesRepository);
const listCategoriesController = new ListCategoriesController(
  listCategoriesUseCase,
);

export { listCategoriesController };
