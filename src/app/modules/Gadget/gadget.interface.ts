export type TCategory =
  | 'Smartphone'
  | 'Laptop'
  | 'Smartwatch'
  | 'Headphone'
  | 'Speaker'
  | 'Camera'

export type TOperatingSystem = 'iOS' | 'Android' | 'macOS' | 'Windows'
export type TConnectivity = 'Bluetooth' | 'Wi-Fi' | ' USB-C'
export type TPowerSource = 'battery-powered' | 'plug-in'

export type TCameraResolution = '5mp' | '16mp' | '48mp' | '108mp'
export type TStorageCapacity =
  | '64gb'
  | '128gb'
  | '256gb'
  | '512gb'
  | '1tb'
  | '2tb'
export type TDisplaySize =
  | '3.5inches'
  | '4.2inches'
  | '6inches'
  | '6.7inches'
  | '13inches'
  | '14inches'
  | '16inches'
export type TDisplayResolution = '720p' | '1080p' | '2k' | '4k'
export type TCameraType = 'DSLR' | 'Mirrorless' | 'Compact' | 'Action'
export type THeadphoneType = 'Over-Ear' | 'On-Ear' | 'In-Ear' | 'Earbuds'
export type TSpeakerType = 'Portable' | 'Bookshelf' | 'Soundbar' | 'Subwoofer'
export type THealthMonitoring =
  | 'Heart Rate'
  | 'Blood Oxygen'
  | 'ECG'
  | 'Sleep Tracking'
export type TBatteryLife = '24 hours' | '48 hours' | '72 hours' | 'Multi-day'

export type TFeatures = {
  cameraResolution: TCameraResolution
  storageCapacity: TStorageCapacity
  displaySize: TDisplaySize
  displayResolution: TDisplayResolution
  cameraType: TCameraType
  headphoneType: THeadphoneType
  speakerType: TSpeakerType
  healthMonitoring: THealthMonitoring
  batteryLife: TBatteryLife
}

export type TSize = {
  weight: string
  dimensions: string
}

export type TGadget = {
  modelNumber: string
  price: string
  releaseDate: string
  brand: string
  category: TCategory
  operatingSystem?: TOperatingSystem
  connectivity: TConnectivity
  powerSource: TPowerSource
  features: Partial<TFeatures>
  size: TSize
  isDeleted?: boolean
}
