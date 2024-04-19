import { TUser } from './user.interface'
import { User } from './user.model'
import bcrypt from 'bcrypt'
import jwt, { Secret } from 'jsonwebtoken'
import { jwtHelpers } from '../../utils/jwtHelpers'
import config from '../../config'
import ApiError from '../../errors/ApiError'
import httpStatus from 'http-status'

// -----------------
// ! Register User
// -----------------

const registerUserIntoDB = async (payload: TUser) => {
  await User.create(payload)
  const result = await User.findOne({ email: payload.email })
  return result
}

// -----------------
// ! Login User
// -----------------

const loginUser = async (payload: Pick<TUser, 'email' | 'password'>) => {
  // check: if user exists with the email
  const userData = await User.findOne({
    email: payload.email,
  }).select('+password')

  if (!userData) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'This user does not exists!')
  }

  //check: password match
  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    userData.password,
  )

  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Password do not match!')
  }

  // generate accessToken
  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt_secret.jwt_access_token_secret as Secret,
    config.jwt_secret.jwt_access_token_expires_in as string,
  )

  console.log(accessToken)

  // generate refreshToken and set it to cookies
  const refreshToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt_secret.jwt_refresh_token_secret as Secret,
    config.jwt_secret.jwt_refresh_token_expires_in as string,
  )

  return {
    accessToken,
    refreshToken,
  }
}

export const UserServices = {
  registerUserIntoDB,
  loginUser,
}
