import { TUserRole } from './user.interface'

export const Role: TUserRole[] = ['USER', 'MANAGER']

export const USER_ROLE = {
  USER: 'USER',
  MANAGER: 'MANAGER',
} as const
