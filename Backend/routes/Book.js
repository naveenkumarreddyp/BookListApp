const express = require('express')
const router = express.Router()
const BookSchema = require('../models/book')
const UserSchema = require('../models/user')

//add book
router.post('/add-book', async (req, res) => {
    const { title, isbn, author, description, publisher } = req.body
    const userId = req.userId
    const newBook = new BookSchema({
        title,
        isbn,
        author,
        description,
        publisher,
        userId
    })

    try {
        await newBook.save()
        res.status(200).json({
            message: "book saved",
            newBook
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "something went wrong"
        })
    }
})

//get all 
router.get('/', async (req, res) => {
    const userId = req.userId

    try {
        const books = await BookSchema.find({ userId })
        if (!books) {
            res.status(400).json({ message: "no book found for this user" })
        } else {
            res.status(200).json(books)
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "something went wrong"
        })
    }
})

//get by id
router.get('/:id', async (req, res) => {
    const id = req.params.id
    const userId = req.userId
    try {
        const books = await BookSchema.findOne({ _id: id, userId })
        if (!books) {
            res.status(400).json({ message: "no book found by this id" })
        } else {
            res.status(200).json(books)
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "something went wrong"
        })
    }
})

//delete
router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const userId = req.userId
    try {
        const deleteBook = await BookSchema.findByIdAndDelete({ _id: id, userId })
        if (!deleteBook) {
            res.status(400).json({ message: "no book find by that id" })
        } else {
            res.status(200).json({ message: "book deleted", deleteBook })
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "something went wrong"
        })
    }
})

//update
router.put('/:id', async (req, res) => {
    const id = req.params.id
    const userId = req.userId
    const { title, isbn, author, description, publisher } = req.body
    try {
        const updateBook = await BookSchema.findByIdAndUpdate(
            { _id: id, userId },
            { title, isbn, author, description, publisher },
            { new: true }
        )
        if (!updateBook) {
            res.status(400).json({ message: "no book found by this id" })
        } else {
            res.status(200).json({ message: "book updated", updateBook })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "something went wrong"
        })
    }
})

module.exports = router

