import { TUser } from './user.interface'
import { User } from './user.model'
import bcrypt from 'bcrypt'

// -----------------
// ! Register User
// -----------------

const registerUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload)
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
    throw new Error('This user does not exists!')
  }

  //check: password match
  const isPasswordMatched = await bcrypt.compare(
    payload.password as string,
    userData.password as string,
  )

  // generate accessToken
}

export const UserServices = {
  registerUserIntoDB,
  loginUser,
}
