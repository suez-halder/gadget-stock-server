import httpStatus from 'http-status'
import { v4 as uuidv4 } from 'uuid'
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
  console.log(query)

  const userData = await User.findOne({
    email: user.email,
  })

  if (!userData) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found!')
  }
  let result

  //TODO: filtering
  // {user.email : {$regex: query.searchTerm, $options: 'i'}}
  // {price : {$regex: query.searchTerm, $options: 'i'}}
  // {brand : {$regex: query.searchTerm, $options: 'i'}}

  let searchTerm = ''
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm
  }

  if (userData.role === USER_ROLE.USER) {
    result = await Gadget.find({
      user: {
        _id: userData.id,
      },
      $or: gadgetSearchableFields.map((field) => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    }).populate('user')
  } else {
    result = await Gadget.find({
      $or: gadgetSearchableFields.map((field) => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    }).populate('user')
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

  if (isGadgetExists.isDeleted === true) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'This Gadget has been deleted!')
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
    }).populate('user')
    if (!result) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized to view this gadget',
      )
    }
  } else {
    result = await Gadget.findById(id).populate('user')
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

  let result

  if (userData.role === USER_ROLE.USER) {
    result = await Gadget.findOneAndUpdate(
      {
        user: {
          _id: userData.id,
        },
        _id: id,
      },
      modifiedData,
      {
        runValidators: true,
        new: true,
      },
    )
    if (!result) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized to update this gadget',
      )
    }
  } else {
    result = await Gadget.findByIdAndUpdate(id, modifiedData, {
      runValidators: true,
      new: true,
    })
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
