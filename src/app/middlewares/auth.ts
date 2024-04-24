import httpStatus from 'http-status'
import ApiError from '../errors/ApiError'
import { TUserRole } from '../modules/User/user.interface'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../config'
import { NextFunction, Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'
import { jwtHelpers } from '../utils/jwtHelpers'
import { User } from '../modules/User/user.model'

const auth = (...roles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization as string

    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized!')
    }

    const decoded = jwtHelpers.verifyToken(
      token,
      config.jwt_secret.jwt_access_token_secret,
    ) as JwtPayload

    const { email, role } = decoded

    const userData = await User.findOne({
      email,
    })

    const isDeleted = userData?.isDeleted

    if (isDeleted) {
      throw new ApiError(httpStatus.FORBIDDEN, 'This user is deleted')
    }

    if (roles && !roles.includes(role)) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized')
    }

    req.user = decoded

    next()
  })
}

export default auth
