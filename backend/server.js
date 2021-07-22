import express from "express"
import path from 'path'
import  dotenv from 'dotenv'
import morgan from 'morgan'
import colors from 'colors'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

import productRoutes from './routes/productRoutes.js'
import userRoute from './routes/userRoute.js'
import orderRoutes from './routes/orderRoute.js'
import uploadRoutes from './routes/uplodRoutes.js'
const app =express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

dotenv.config();

connectDB()


app.use('/api/products', productRoutes)
app.use('/api/users',userRoute)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFound)
app.use(errorHandler)


const PORT=process.env.PORT||5000

app.listen(PORT,function(){
    console.log(`Server running in ${process.env.NODE_ENV} node on port no ${PORT}`.yellow.bold)
})