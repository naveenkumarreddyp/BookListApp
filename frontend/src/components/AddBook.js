import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function AddBook() {

    const [title, setTitle] = useState('')
    const [isbn, setIsbn] = useState('')
    const [author, setAuthor] = useState('')
    const [description, setDescription] = useState('')
    const [publishedDate, setPublishedDate] = useState('')
    const [publisher, setPublisher] = useState('')

    const addBook = async () => {
        const user = JSON.parse(localStorage.getItem('user'))
        const token = user.token
        const userId = user.id

        try {
            const result = await axios.post('http://localhost:5050/add-book', {
                title,
                isbn,
                author,
                description,
                publishedDate,
                publisher,
                userId
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(result.data);

            //for reset the form field after submit
            setTitle('')
            setIsbn('')
            setAuthor('')
            setDescription('')
            setPublishedDate('')
            setPublisher('')

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='add-book-container'>
            <Link to='/' className='link'>Show Book List</Link>

            <h1>Add Book</h1>
            <h4>Create a new book</h4>

            <input
                type="text"
                placeholder='Title of the book'
                value={title}
                onChange={(e) => setTitle(e.target.value)} />

            <input
                type="text"
                placeholder='ISBN'
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)} />

            <input type="text"
                placeholder='Author'
                value={author}
                onChange={(e) => setAuthor(e.target.value)} />

            <input type="text"
                placeholder='Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)} />

            <input type="date"
                placeholder='Published Date'
                value={publishedDate}
                onChange={(e) => setPublishedDate(e.target.value)} />

            <input type="text"
                placeholder='Publisher'
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)} />

            <button onClick={addBook} >Submit</button>
        </div>
    )
}
