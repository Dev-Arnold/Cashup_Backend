import express from 'express'
const app = express()
import connect from './dbConfig/dbconfig.js'
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import errorHandler from './middlewares/errorHandler.js'
const port = process.env.PORT || 2500
import dotenv from 'dotenv';
// const { swaggerDocs, swaggerUi } = require('./config/swagger'); 
import { swaggerDocs,swaggerUi } from './dbConfig/swagger.js'

dotenv.config();
app.use(express.json());  

connect()
console.log(process.env.PORT)
app.use('/api/product', productRoutes);

app.use('/api/user',userRoutes)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(errorHandler)

app.listen(port,()=>{
    console.log(`Mongodb running on port ${port}`)
})
