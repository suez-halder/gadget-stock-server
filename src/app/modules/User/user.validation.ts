import { z } from 'zod'
import { Role, USER_ROLE } from './user.constant'

const registerUserValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required!',
    }),
    email: z.string({
      required_error: 'Email is required!',
    }),
    password: z.string({
      required_error: 'Password is required!',
    }),
    role: z.enum([...Role] as [string, ...string[]]).default(USER_ROLE.USER),
  }),
})

const loginUserValidationSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required!',
    }),
    password: z.string({
      required_error: 'Password is required!',
    }),
  }),
})

export const UserValidations = {
  registerUserValidationSchema,
  loginUserValidationSchema,
}
