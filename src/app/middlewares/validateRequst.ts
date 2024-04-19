import { AnyZodObject } from 'zod'
import catchAsync from '../utils/catchAsync'

const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req, res, next) => {
    await schema.parseAsync({
      body: req.body,
    })
    return next()
  })
}

export default validateRequest
