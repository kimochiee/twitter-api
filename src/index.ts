import express, { Request, Response, NextFunction } from 'express'
const app = express()

import { databaseService } from './services/database.services'
import userRouter from './routes/users.routes'

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/v1/users', userRouter)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err)
  res.status(400).json({ err: err.message })
})

app.listen(8000, async () => {
  await databaseService.connect()
  console.log('Server is running')
})
