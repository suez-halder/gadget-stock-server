export type TCategory =
  | 'Smartphone'
  | 'Laptop'
  | 'Headphone'
  | 'Smartwatch'
  | 'Speaker'

export type TOperatingSystem = 'iOS' | 'Android' | 'Windows'
export type TConnectivity = 'Bluetooth' | 'Wi-Fi' | ' USB-C'
export type TPowerSource = 'battery-powered' | 'plug-in'

export type TGadget = {
  price: number
  releaseDate: string
  brand: string
  category: TCategory
  operatingSystem?: TOperatingSystem
  connectivity: TConnectivity
  powerSource: TPowerSource
}
