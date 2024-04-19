import { model, Schema } from 'mongoose'
import { Role, USER_ROLE } from './user.constant'
import { TUser } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../../config'

const userSchema = new Schema<TUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: String,
    enum: Role,
    default: USER_ROLE.USER,
  },
})

// password encryption
userSchema.pre('save', async function (next) {
  const hashedPassword = await bcrypt.hash(
    this.password as string,
    Number(config.bcrypt_salt_rounds),
  )

  this.password = hashedPassword
  next()
})

// don't show password in response
userSchema.post('save', function (doc, next) {
  ;(doc.password = undefined), next()
})

export const User = model<TUser>('User', userSchema)
