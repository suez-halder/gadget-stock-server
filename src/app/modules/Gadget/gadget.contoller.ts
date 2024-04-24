import httpStatus from 'http-status'
import { TAuthUser } from '../../interfaces/common/user'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { GadgetServices } from './gadget.service'

const createGadgetIntoDB = catchAsync(async (req, res) => {
  const user = req.user as TAuthUser
  const result = await GadgetServices.createGadgetIntoDB(req.body, user)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: `Gadget - ${req.body.category} created successfully!`,
    data: result,
  })
})
const getAllGadgetsFromDB = catchAsync(async (req, res) => {
  const user = req.user as TAuthUser
  const result = await GadgetServices.getAllGadgetsFromDB(user)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `All gadgets fetched successfully!`,
    data: result,
  })
})
const getSingleGadgetFromDB = catchAsync(async (req, res) => {
  const { id } = req.params
  const user = req.user as TAuthUser
  const result = await GadgetServices.getSingleGadgetFromDB(id, user)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Single gadget fetched successfully!`,
    data: result,
  })
})
const updateGadgetIntoDB = catchAsync(async (req, res) => {
  const { id } = req.params
  const user = req.user as TAuthUser
  const result = await GadgetServices.updateGadgetIntoDB(id, req.body, user)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Gadget updated successfully!`,
    data: result,
  })
})
const softDeleteGadgetFromDB = catchAsync(async (req, res) => {
  const { id } = req.params
  const user = req.user as TAuthUser
  await GadgetServices.softDeleteGadgetFromDB(id, req.body, user)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Gadget soft deleted successfully!`,
    data: null,
  })
})
const deleteGadgetFromDB = catchAsync(async (req, res) => {
  const { id } = req.params
  const user = req.user as TAuthUser
  await GadgetServices.deleteGadgetFromDB(id, user)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Gadget deleted from DB!`,
    data: null,
  })
})

export const GadgetControllers = {
  createGadgetIntoDB,
  getAllGadgetsFromDB,
  getSingleGadgetFromDB,
  updateGadgetIntoDB,
  softDeleteGadgetFromDB,
  deleteGadgetFromDB,
}
