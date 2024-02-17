const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const UserRoutes = require('./routes/User')
require("dotenv").config({ path: "config/config.env" })



//middlewares
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
  }));
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))


//routes
app.use('/api/v1',UserRoutes)


module.exports =  app