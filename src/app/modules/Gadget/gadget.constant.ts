import {
  TBatteryLife,
  TCameraResolution,
  TCameraType,
  TCategory,
  TConnectivity,
  TDisplayResolution,
  TDisplaySize,
  TFeatures,
  THeadphoneType,
  THealthMonitoring,
  TOperatingSystem,
  TPowerSource,
  TSpeakerType,
  TStorageCapacity,
} from './gadget.interface'

export const Category: TCategory[] = [
  'Smartphone',
  'Laptop',
  'Smartwatch',
  'Headphone',
  'Speaker',
  'Camera',
]

export const OperatingSystem: TOperatingSystem[] = [
  'iOS',
  'Android',
  'macOS',
  'Windows',
]
export const Connectivity: TConnectivity[] = ['Bluetooth', 'Wi-Fi', ' USB-C']
export const PowerSource: TPowerSource[] = ['battery-powered', 'plug-in']

export const CameraResolution: TCameraResolution[] = [
  '5mp',
  '16mp',
  '48mp',
  '108mp',
]
export const StorageCapacity: TStorageCapacity[] = [
  '64gb',
  '128gb',
  '256gb',
  '512gb',
  '1tb',
  '2tb',
]
export const DisplaySize: TDisplaySize[] = [
  '3.5inches',
  '4.2inches',
  '6inches',
  '6.7inches',
  '13inches',
  '14inches',
  '16inches',
]
export const DisplayResolution: TDisplayResolution[] = [
  '720p',
  '1080p',
  '2k',
  '4k',
]

export const CameraType: TCameraType[] = [
  'DSLR',
  'Mirrorless',
  'Compact',
  'Action',
]

export const HeadphoneType: THeadphoneType[] = [
  'Over-Ear',
  'On-Ear',
  'In-Ear',
  'Earbuds',
]

export const SpeakerType: TSpeakerType[] = [
  'Portable',
  'Bookshelf',
  'Soundbar',
  'Subwoofer',
]

export const HealthMonitoring: THealthMonitoring[] = [
  'Heart Rate',
  'Blood Oxygen',
  'ECG',
  'Sleep Tracking',
]

export const BatteryLife: TBatteryLife[] = [
  '24 hours',
  '48 hours',
  '72 hours',
  'Multi-day',
]

export const gadgetSearchableFields = [
  'user.name',
  'user.email',
  'price',
  'brand',
  'category',
  'operatingSystem',
  'connectivity',
  'powerSource',
  'features.storageCapacity',
  'features.cameraResolution',
  'features.displaySize',
  'features.displayResolution',
  'features.cameraType',
  'features.headphoneType',
  'features.speakerType',
  'features.healthMonitoring',
  'features.batteryLife',
  'size.weight',
  'size.dimensions',
]
