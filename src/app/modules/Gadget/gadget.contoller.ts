import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { GadgetServices } from './gadget.service'

const createGadgetIntoDB = catchAsync(async (req, res) => {
  const result = await GadgetServices.createGadgetIntoDB(req.body)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: `Gadget - ${req.body.category} created successfully!`,
    data: result,
  })
})

export const GadgetControllers = {
  createGadgetIntoDB,
}
