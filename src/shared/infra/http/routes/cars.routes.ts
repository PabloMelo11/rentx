import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { CreateCarSpecificationsController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationsController';
import { UploadCarImagesController } from '@modules/cars/useCases/uploadCarImages/UploadCarImagesController';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationsController();
const uploadCarImagesController = new UploadCarImagesController();

const uploadCarImages = multer(uploadConfig);

carsRoutes.get('/available', listAvailableCarsController.handle);

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle,
);

carsRoutes.post(
  '/specifications/:car_id',
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle,
);

carsRoutes.post(
  '/images/:car_id',
  ensureAuthenticated,
  ensureAdmin,
  uploadCarImages.array('images'),
  uploadCarImagesController.handle,
);

export { carsRoutes };
