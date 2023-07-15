const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const userRoutes = require('./routes/User')
const bookRoutes = require('./routes/Book')
const auth = require('./middleware/auth')


require('dotenv').config()
const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

//routes
app.use('', userRoutes)
app.use('', auth, bookRoutes)


//connection to db
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('connected to db');
        app.listen(PORT, () => {
            console.log(`server is running on port ${PORT}`);
        })
    }).catch(err => {
        console.log(err);
    })