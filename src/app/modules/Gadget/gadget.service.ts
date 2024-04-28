import httpStatus from 'http-status'
import { v4 as uuidv4 } from 'uuid'
import QueryBuilder from '../../builder/QueryBuilder'
import ApiError from '../../errors/ApiError'
import { TAuthUser } from '../../interfaces/common/user'
import { USER_ROLE } from '../User/user.constant'
import { User } from '../User/user.model'
import { gadgetSearchableFields } from './gadget.constant'

// -----------------
// ! Create Gadget
// -----------------

import { TGadget } from './gadget.interface'
import { Gadget } from './gadget.model'

const createGadgetIntoDB = async (payload: TGadget, user: TAuthUser) => {
  const userData = await User.findOne({
    email: user.email,
  })

  if (!userData) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found!')
  }

  payload.modelNumber = uuidv4()
  payload.user = userData?._id
  const result = await Gadget.create(payload)
  return result
}

// -----------------
// ! Get All Gadgets
// -----------------

const getAllGadgetsFromDB = async (
  user: TAuthUser,
  query: Record<string, unknown>,
) => {
  // check 1: if user exists
  const userData = await User.findOne({
    email: user.email,
  })

  if (!userData) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found!')
  }

  let baseQuery = Gadget.find()
  if (userData.role === USER_ROLE.USER) {
    baseQuery = baseQuery.find({ user: { _id: userData.id } })
  }

  // searching/filtering/pagination
  const gadgetQUery = new QueryBuilder(baseQuery.populate('user'), query)
    .search(gadgetSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await gadgetQUery.modelQuery
  const meta = await gadgetQUery.countTotal()

  return {
    meta,
    result,
  }
}

// -------------------
// ! Get Single Gadget
// -------------------

const getSingleGadgetFromDB = async (id: string, user: TAuthUser) => {
  // check if gadget exists
  const isGadgetExists = await Gadget.findById(id)
  if (!isGadgetExists) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Please enter a valid Gadget Id!',
    )
  }

  if (isGadgetExists.isDeleted === true) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'This Gadget has been deleted!')
  }

  const userData = await User.findOne({
    email: user.email,
  })

  if (!userData) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found!')
  }

  const result = await (userData.role === USER_ROLE.USER
    ? Gadget.findOne({ user: { _id: userData.id }, _id: id }).populate('user')
    : Gadget.findById(id).populate('user'))

  if (!result && userData.role === USER_ROLE.USER) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'You are not authorized to view this gadget',
    )
  }

  return result
}

// -------------------
// ! Update Gadget
// -------------------

const updateGadgetIntoDB = async (
  id: string,
  payload: Partial<TGadget>,
  user: TAuthUser,
) => {
  // check if gadget exists
  const isGadgetExists = await Gadget.findById(id)
  if (!isGadgetExists) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Please enter a valid Gadget Id!',
    )
  }

  const userData = await User.findOne({
    email: user.email,
  })

  if (!userData) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found!')
  }

  const { isDeleted, features, size, ...remainingGadgetData } = payload

  if (isDeleted !== undefined) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Modifying the deletion status is not allowed through this route.',
    )
  }

  let modifiedData: Record<string, unknown> = { ...remainingGadgetData }

  if (features && Object.keys(features).length) {
    for (const [key, value] of Object.entries(features)) {
      modifiedData[`features.${key}`] = value
    }
  }

  const result = await (userData.role === USER_ROLE.USER
    ? Gadget.findOneAndUpdate(
        { user: { _id: userData.id }, _id: id },
        modifiedData,
        { runValidators: true, new: true },
      )
    : Gadget.findByIdAndUpdate(id, modifiedData, {
        runValidators: true,
        new: true,
      }))

  if (!result && userData.role === USER_ROLE.USER) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'You are not authorized to update this gadget',
    )
  }

  return result
}

// ---------------------
// ! Soft Delete Gadget
// ---------------------

const softDeleteGadgetFromDB = async (
  id: string,
  payload: { isDeleted: boolean },
  user: TAuthUser,
) => {
  // check if gadget exists
  const isGadgetExists = await Gadget.findById(id)
  if (!isGadgetExists) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Please enter a valid Gadget Id!',
    )
  }

  const userData = await User.findOne({
    email: user.email,
  })

  if (!userData) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found!')
  }

  const result = await (userData.role === USER_ROLE.USER
    ? Gadget.findOneAndUpdate(
        { user: { _id: userData.id }, _id: id },
        { isDeleted: payload.isDeleted },
      )
    : Gadget.findByIdAndUpdate(id, { isDeleted: payload.isDeleted }))

  if (!result && userData.role === USER_ROLE.USER) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'You are not authorized to delete this gadget',
    )
  }

  return result
}

// -------------------
// ! Delete Gadget
// -------------------

const deleteGadgetFromDB = async (id: string, user: TAuthUser) => {
  // check if gadget exists
  const isGadgetExists = await Gadget.findById(id)
  if (!isGadgetExists) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Please enter a valid Gadget Id!',
    )
  }

  //check if user exists
  const userData = await User.findOne({
    email: user.email,
  })

  if (!userData) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found!')
  }

  const result = await (userData.role === USER_ROLE.USER
    ? Gadget.findOneAndDelete({ user: { _id: userData.id }, _id: id })
    : Gadget.findByIdAndDelete(id))

  if (!result && userData.role === USER_ROLE.USER) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'You are not authorized to delete this gadget from DB',
    )
  }

  return result
}

export const GadgetServices = {
  createGadgetIntoDB,
  getAllGadgetsFromDB,
  getSingleGadgetFromDB,
  updateGadgetIntoDB,
  softDeleteGadgetFromDB,
  deleteGadgetFromDB,
}
