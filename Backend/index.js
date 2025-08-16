const express = require('express');
const cors = require('cors');
const connectDB = require('./config/connection')
const dotenv = require('dotenv')
const router = require('./routes/Todoroute')
dotenv.config()

const app = express();
connectDB()
//middlewares
app.use(express.json())
app.use(cors())

//routes
app.use('/',router)


app.listen(process.env.PORT, ()=>{
    console.log("Database connected to port ",process.env.PORT)
})