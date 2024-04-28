import { Response } from 'express'
type TMeta = {
  limit: number
  page: number
  total: number
  totalPage: number
}

const sendResponse = <T>(
  res: Response,
  jsonData: {
    statusCode: number
    success: boolean
    message: string
    meta?: TMeta
    data: T
  },
) => {
  res.status(jsonData?.statusCode).json({
    success: jsonData.success,
    message: jsonData.message,
    meta: jsonData.meta,
    data: jsonData.data,
  })
}

export default sendResponse
