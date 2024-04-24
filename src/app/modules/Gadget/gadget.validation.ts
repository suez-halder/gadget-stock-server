import { z } from 'zod'
import {
  BatteryLife,
  CameraResolution,
  CameraType,
  Category,
  Connectivity,
  DisplayResolution,
  DisplaySize,
  HeadphoneType,
  HealthMonitoring,
  OperatingSystem,
  PowerSource,
  SpeakerType,
  StorageCapacity,
} from './gadget.constant'

const featuresSchema = z.object({
  cameraResolution: z
    .enum([...CameraResolution] as [string, ...string[]])
    .optional(),
  storageCapacity: z
    .enum([...StorageCapacity] as [string, ...string[]])
    .optional(),
  displaySize: z.enum([...DisplaySize] as [string, ...string[]]).optional(),
  displayResolution: z
    .enum([...DisplayResolution] as [string, ...string[]])
    .optional(),
  cameraType: z.enum([...CameraType] as [string, ...string[]]).optional(),
  headphoneType: z.enum([...HeadphoneType] as [string, ...string[]]).optional(),
  speakerType: z.enum([...SpeakerType] as [string, ...string[]]).optional(),
  healthMonitoring: z
    .enum([...HealthMonitoring] as [string, ...string[]])
    .optional(),
  batteryLife: z.enum([...BatteryLife] as [string, ...string[]]).optional(),
})

const sizeSchema = z.object({
  weight: z.string().nonempty({ message: 'Weight is required.' }),
  dimensions: z.string().nonempty({ message: 'Dimensions are required.' }),
})

const createGadgetValidationSchema = z.object({
  body: z.object({
    price: z.string().nonempty({ message: 'Price is required.' }),
    releaseDate: z.string().nonempty({ message: 'Release date is required.' }),
    brand: z.string().nonempty({ message: 'Brand is required.' }),
    category: z.enum([...Category] as [string, ...string[]]),
    operatingSystem: z
      .enum([...OperatingSystem] as [string, ...string[]])
      .optional(),
    connectivity: z.enum([...Connectivity] as [string, ...string[]]),
    powerSource: z.enum([...PowerSource] as [string, ...string[]]),
    features: featuresSchema,
    size: sizeSchema,
    isDeleted: z.boolean().default(false),
  }),
})

export const GadgetValidations = {
  createGadgetValidationSchema,
}
