const express = require('express')
const router = express.Router()
const UserSchema = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config()
const SECRET_KEY = process.env.SECRET_KEY

//register
router.post('/register', async (req, res) => {
    const { username, password } = req.body
    try {
        //check if the user existed or not
        const existingUser = await UserSchema.findOne({ username })
        if (existingUser) {
            return res.status(400).json({
                message: "User already exist"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        //creating user
        const result = await UserSchema.create({
            username,
            password: hashedPassword
        })

        //token generation
        const token = jwt.sign({ username: result.username, id: result._id }, SECRET_KEY)
        res.status(200).json({
            message: "user created successfully",
            user: result,
            token
        })


    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong"
        })
    }
})

//login
router.post('/login', async (req, res) => {
    const { username, password } = req.body
    try {
        //check if user present in the database or not
        const existingUser = await UserSchema.findOne({ username })
        if (!existingUser) {
            return res.status(500).json({
                message: "user not found"
            })
        }

        //match the password
        const matchPassword = await bcrypt.compare(password, existingUser.password)
        if (!matchPassword) {
            return res.status(400).json({
                message: "Invalid credentials"
            })
        }

        //token generation
        const token = jwt.sign({ username: existingUser.username, id: existingUser._id }, SECRET_KEY)
        res.status(200).json({
            message: "user login successfully",
            username: existingUser.username,
            id: existingUser._id,
            token
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong"
        })
    }
})

module.exports = router