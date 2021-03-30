import { Router } from 'express';

import { categoriesRoutes } from './categories.routes';
import { specificationsRoutes } from './specifications.routes';
import { usersRoutes } from './users.routes';
import { authenticationsRoutes } from './authentications.routes';
import { carsRoutes } from './cars.routes';

const router = Router();

router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationsRoutes);
router.use('/users', usersRoutes);
router.use(authenticationsRoutes);
router.use('/cars', carsRoutes);

export { router };
