import { Router } from 'express';

import { categoriesRoutes } from '../routes/categories.routes';
import { specificationsRoutes } from '../routes/specifications.routes';
import { usersRoutes } from '../routes/users.routes';
import { authenticationsRoutes } from '../routes/authentications.routes';

const router = Router();

router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationsRoutes);
router.use('/users', usersRoutes);
router.use(authenticationsRoutes);

export { router };
