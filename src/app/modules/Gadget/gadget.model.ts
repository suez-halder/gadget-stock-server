import { model, Schema } from 'mongoose'
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
import { TFeatures, TGadget, TSize } from './gadget.interface'

const featuresSchema = new Schema<TFeatures>(
  {
    cameraResolution: {
      type: String,
      enum: CameraResolution,
    },
    storageCapacity: {
      type: String,
      enum: StorageCapacity,
    },
    displaySize: {
      type: String,
      enum: DisplaySize,
    },
    displayResolution: {
      type: String,
      enum: DisplayResolution,
    },
    cameraType: {
      type: String,
      enum: CameraType,
    },
    headphoneType: {
      type: String,
      enum: HeadphoneType,
    },
    speakerType: {
      type: String,
      enum: SpeakerType,
    },
    healthMonitoring: {
      type: String,
      enum: HealthMonitoring,
    },
    batteryLife: {
      type: String,
      enum: BatteryLife,
    },
  },
  {
    _id: false,
  },
)

const sizeSchema = new Schema<TSize>(
  {
    weight: {
      type: String,
      required: true,
    },
    dimensions: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  },
)

const gadgetSchema = new Schema<TGadget>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    modelNumber: {
      type: String,
      unique: true,
    },
    price: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: Category,
      required: true,
    },
    operatingSystem: {
      type: String,
      enum: OperatingSystem,
    },
    connectivity: {
      type: String,
      enum: Connectivity,
      required: true,
    },
    powerSource: {
      type: String,
      enum: PowerSource,
      required: true,
    },
    features: {
      type: featuresSchema,
      required: true,
    },
    size: {
      type: sizeSchema,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

export const Gadget = model<TGadget>('Gadget', gadgetSchema)
