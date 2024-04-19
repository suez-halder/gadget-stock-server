import { Request, Response } from 'express'
import { UserServices } from './user.service'

const registerUserIntoDB = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.registerUserIntoDB(req.body)

    res.status(201).json({
      success: true,
      message: 'User registered successfully!',
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

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.loginUser(req.body)
    const { refreshToken } = result

    res.cookie('refreshToken', refreshToken, {
      secure: false,
      httpOnly: true,
    })

    res.status(201).json({
      success: true,
      message: 'User logged in successfully!',
      data: {
        accessToken: result.accessToken,
      },
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
  registerUserIntoDB,
  loginUser,
}
