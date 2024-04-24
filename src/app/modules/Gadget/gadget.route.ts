import express from 'express'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequst'
import { USER_ROLE } from '../User/user.constant'
import { GadgetControllers } from './gadget.contoller'
import { GadgetValidations } from './gadget.validation'

const router = express.Router()

router.get(
  '/',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.MANAGER, USER_ROLE.USER),
  GadgetControllers.getAllGadgetsFromDB,
)
router.get(
  '/:id',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.MANAGER, USER_ROLE.USER),
  GadgetControllers.getSingleGadgetFromDB,
)

router.post(
  '/create-gadget',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.MANAGER, USER_ROLE.USER),
  validateRequest(GadgetValidations.createGadgetValidationSchema),
  GadgetControllers.createGadgetIntoDB,
)
router.put(
  '/update-gadget/:id',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.MANAGER, USER_ROLE.USER),
  GadgetControllers.updateGadgetIntoDB,
)

router.patch(
  '/soft/:id',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.MANAGER, USER_ROLE.USER),
  GadgetControllers.softDeleteGadgetFromDB,
)
router.delete(
  '/:id',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.MANAGER, USER_ROLE.USER),
  GadgetControllers.deleteGadgetFromDB,
)

export const GadgetRoutes = router
