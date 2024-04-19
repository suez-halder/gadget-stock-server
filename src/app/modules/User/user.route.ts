import express from 'express'
import { UserControllers } from './user.controller'

const router = express.Router()

router.post('/register-user', UserControllers.registerUserIntoDB)
router.post('/login-user', UserControllers.loginUser)

export const UserRoutes = router
