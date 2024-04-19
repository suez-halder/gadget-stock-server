import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import router from './app/routes'
import globalErrorHandler from './app/middlewares/globalErrorHandler'

const app: Application = express()

//parsers
app.use(express.json())
app.use(cors())
app.use(cors({ origin: ['http://localhost:5173', '*'], credentials: true }))

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to Gadget Stock!',
  })
})

app.use('/api', router)
app.use(globalErrorHandler)

export default app
