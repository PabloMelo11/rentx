import { Router } from 'express';

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

import { CreateRentalController } from '@modules/rentals/useCases/createRental/createRentalController';
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController';

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();

rentalsRoutes.post('/', ensureAuthenticated, createRentalController.handle);

rentalsRoutes.post(
  '/devolution/:rental_id',
  ensureAuthenticated,
  devolutionRentalController.handle,
);

export { rentalsRoutes };
