import { TUserRole } from './user.interface'

export const Role: TUserRole[] = ['USER', 'MANAGER', 'SUPER_ADMIN']

export const USER_ROLE = {
  USER: 'USER',
  MANAGER: 'MANAGER',
  SUPER_ADMIN: 'SUPER_ADMIN',
} as const
