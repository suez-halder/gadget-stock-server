import express from 'express'
import { GadgetRoutes } from '../modules/Gadget/gadget.route'
import { UserRoutes } from '../modules/User/user.route'

const router = express.Router()

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/gadgets',
    route: GadgetRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
