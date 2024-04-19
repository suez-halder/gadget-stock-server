import { USER_ROLE } from './user.constant'

export type TUserRole = keyof typeof USER_ROLE

export type TUser = {
  name: string
  email: string
  password: string
  role: TUserRole
  isDeleted?: boolean
}
