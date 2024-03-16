import express from 'express'
const app = express()

import { databaseService } from './services/database.services'
import userRouter from './routes/users.routes'
import { errorMiddleware } from './middlewares/error.middlewares'

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/v1/users', userRouter)
app.use(errorMiddleware)

app.listen(8000, async () => {
  await databaseService.connect()
  console.log('Server is running')
})
