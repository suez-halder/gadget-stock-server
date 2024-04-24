import express from 'express'
import validateRequest from '../../middlewares/validateRequst'
import { GadgetControllers } from './gadget.contoller'
import { GadgetValidations } from './gadget.validation'

const router = express.Router()

router.post(
  '/create-gadget',
  validateRequest(GadgetValidations.createGadgetValidationSchema),
  GadgetControllers.createGadgetIntoDB,
)

export const GadgetRoutes = router
