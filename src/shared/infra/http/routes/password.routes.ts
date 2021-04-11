import { Router } from 'express';

import { SendForgotPasswordMailController } from '@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController';
import { ResetPasswordController } from '@modules/accounts/useCases/resetPassword/ResetPasswordController';

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordController = new ResetPasswordController();

passwordRoutes.post(
  '/forgot-password',
  sendForgotPasswordMailController.handle,
);

passwordRoutes.patch('/reset-password', resetPasswordController.handle);

export { passwordRoutes };
