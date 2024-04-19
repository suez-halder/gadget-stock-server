import {
  TCategory,
  TConnectivity,
  TOperatingSystem,
  TPowerSource,
} from './gadget.interface'

export const Category: TCategory[] = [
  'Smartphone',
  'Laptop',
  'Headphone',
  'Smartwatch',
  'Speaker',
]

export const OperatingSystem: TOperatingSystem[] = ['iOS', 'Android', 'Windows']
export const Connectivity: TConnectivity[] = ['Bluetooth', 'Wi-Fi', ' USB-C']
export const PowerSource: TPowerSource[] = ['battery-powered', 'plug-in']
