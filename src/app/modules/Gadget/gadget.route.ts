import express from 'express'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequst'
import { USER_ROLE } from '../User/user.constant'
import { GadgetControllers } from './gadget.contoller'
import { GadgetValidations } from './gadget.validation'

const router = express.Router()

router.post(
  '/create-gadget',
  auth(USER_ROLE.USER),
  validateRequest(GadgetValidations.createGadgetValidationSchema),
  GadgetControllers.createGadgetIntoDB,
)

export const GadgetRoutes = router
