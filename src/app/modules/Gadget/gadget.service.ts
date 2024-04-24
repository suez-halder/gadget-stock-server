import { v4 as uuidv4 } from 'uuid'

// -----------------
// ! Create Gadget
// -----------------

import { TGadget } from './gadget.interface'
import { Gadget } from './gadget.model'

const createGadgetIntoDB = async (payload: TGadget) => {
  payload.modelNumber = uuidv4()
  const result = await Gadget.create(payload)
  return result
}

export const GadgetServices = {
  createGadgetIntoDB,
}
