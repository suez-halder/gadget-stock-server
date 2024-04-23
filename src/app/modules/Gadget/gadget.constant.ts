import {
  TCameraResolution,
  TCategory,
  TConnectivity,
  TDisplayResolution,
  TDisplaySize,
  TFeatures,
  TOperatingSystem,
  TPowerSource,
  TStorageCapacity,
} from './gadget.interface'

export const Category: TCategory[] = [
  'Smartphone',
  'Laptop',
  'Headphone',
  'Smartwatch',
  'Speaker',
  'Camera',
]

export const OperatingSystem: TOperatingSystem[] = ['iOS', 'Android', 'Windows']
export const Connectivity: TConnectivity[] = ['Bluetooth', 'Wi-Fi', ' USB-C']
export const PowerSource: TPowerSource[] = ['battery-powered', 'plug-in']

export const CameraResolution: TCameraResolution[] = [
  '5mp',
  '16mp',
  '48mp',
  '108mp',
]
export const StorageCapacity: TStorageCapacity[] = [
  '256gb',
  '512gb',
  '1tb',
  '2tb',
]
export const DisplaySize: TDisplaySize[] = [
  '6inches',
  '6.7inches',
  '13inches',
  '14inches',
  '16inches',
]
export const DisplayResolution: TDisplayResolution[] = [
  '720p',
  '1280P',
  '2k',
  '4k',
]
