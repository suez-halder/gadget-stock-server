import { Request, Response } from 'express'
import { UserServices } from './user.service'

const createUserIntoDB = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.createUserIntoDB(req.body)

    res.status(201).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      data: err.message,
    })
  }
}

export const UserControllers = {
  createUserIntoDB,
}
