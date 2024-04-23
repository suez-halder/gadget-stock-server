export type TCategory =
  | 'Smartphone'
  | 'Laptop'
  | 'Headphone'
  | 'Smartwatch'
  | 'Speaker'
  | 'Camera'

export type TOperatingSystem = 'iOS' | 'Android' | 'Windows'
export type TConnectivity = 'Bluetooth' | 'Wi-Fi' | ' USB-C'
export type TPowerSource = 'battery-powered' | 'plug-in'

export type TCameraResolution = '5mp' | '16mp' | '48mp' | '108mp'
export type TStorageCapacity = '256gb' | '512gb' | '1tb' | '2tb'
export type TDisplaySize =
  | '6inches'
  | '6.7inches'
  | '13inches'
  | '14inches'
  | '16inches'
export type TDisplayResolution = '720p' | '1280P' | '2k' | '4k'

export type TFeatures = {
  cameraResolution: TCameraResolution
  storageCapacity: TStorageCapacity
  displaySize: TDisplaySize
  displayResolution: TDisplayResolution
}

export type TGadget = {
  price: number
  releaseDate: string
  brand: string
  category: TCategory
  operatingSystem?: TOperatingSystem
  connectivity: TConnectivity
  powerSource: TPowerSource
  features?: TFeatures
}
