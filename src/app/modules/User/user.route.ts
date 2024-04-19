import express from 'express'
import validateRequest from '../../middlewares/validateRequst'
import { UserControllers } from './user.controller'
import { UserValidations } from './user.validation'

const router = express.Router()

router.post(
  '/register-user',
  validateRequest(UserValidations.registerUserValidationSchema),
  UserControllers.registerUserIntoDB,
)
router.post(
  '/login-user',
  validateRequest(UserValidations.loginUserValidationSchema),
  UserControllers.loginUser,
)

export const UserRoutes = router
