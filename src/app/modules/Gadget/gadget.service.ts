import httpStatus from 'http-status'
import { v4 as uuidv4 } from 'uuid'
import ApiError from '../../errors/ApiError'
import { TAuthUser } from '../../interfaces/common/user'
import { USER_ROLE } from '../User/user.constant'
import { User } from '../User/user.model'

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

const getAllGadgetsFromDB = async (user: TAuthUser) => {
  const userData = await User.findOne({
    email: user.email,
  })

  if (!userData) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found!')
  }
  let result

  //TODO: filtering

  if (userData.role === USER_ROLE.USER) {
    result = await Gadget.find({
      user: {
        _id: userData.id,
      },
    })
  } else {
    result = await Gadget.find()
  }

  return result
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

  const userData = await User.findOne({
    email: user.email,
  })

  if (!userData) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found!')
  }
  let result

  if (userData.role === USER_ROLE.USER) {
    result = await Gadget.findOne({
      user: {
        _id: userData.id,
      },
      _id: id,
    })
    if (!result) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized to view this gadget',
      )
    }
  } else {
    result = await Gadget.findById(id)
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

  let result

  //TODO: update for objects

  if (userData.role === USER_ROLE.USER) {
    result = await Gadget.findOneAndUpdate(
      {
        user: {
          _id: userData.id,
        },
        _id: id,
      },
      payload,
    )
    if (!result) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized to update this gadget',
      )
    }
  } else {
    result = await Gadget.findByIdAndUpdate(id, payload)
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

  let result

  if (userData.role === USER_ROLE.USER) {
    result = await Gadget.findOneAndUpdate(
      {
        user: {
          _id: userData.id,
        },
        _id: id,
      },
      {
        isDeleted: payload.isDeleted,
      },
    )
    if (!result) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized to delete this gadget',
      )
    }
  } else {
    result = await Gadget.findByIdAndUpdate(id, {
      isDeleted: payload.isDeleted,
    })
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

  let result

  if (userData.role === USER_ROLE.USER) {
    result = await Gadget.findOneAndDelete({
      user: {
        _id: userData.id,
      },
      _id: id,
    })
    if (!result) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized to delete this gadget from DB',
      )
    }
  } else {
    result = await Gadget.findByIdAndDelete(id)
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
