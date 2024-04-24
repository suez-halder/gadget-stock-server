import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { UserServices } from './user.service'

const registerUserIntoDB = catchAsync(async (req, res) => {
  const result = await UserServices.registerUserIntoDB(req.body)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User registered successfully!',
    data: result,
  })
})

const loginUser = catchAsync(async (req, res) => {
  const result = await UserServices.loginUser(req.body)
  const { refreshToken } = result

  res.cookie('refreshToken', refreshToken, {
    secure: false,
    httpOnly: true,
  })

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User logged in successfully!',
    data: {
      accessToken: result.accessToken,
    },
  })
})

export const UserControllers = {
  registerUserIntoDB,
  loginUser,
}
