import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'


export default function UpdateComponent() {

    const [title, setTitle] = useState('')
    const [isbn, setIsbn] = useState('')
    const [author, setAuthor] = useState('')
    const [description, setDescription] = useState('')
    const [publishedDate, setPublishedDate] = useState('')
    const [publisher, setPublisher] = useState('')
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getBookDetails()
    }, [])


    //get the data in the input field
    const getBookDetails = async () => {
        console.log(params);
        try {
            const user = JSON.parse(localStorage.getItem('user'))
            const token = user.token
            const response = await axios.get(`http://localhost:5050/${params.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response.data);
            setTitle(response.data.title)
            setIsbn(response.data.isbn)
            setAuthor(response.data.author)
            setDescription(response.data.description)
            setPublishedDate(response.data.updatedAt)
            setPublisher(response.data.publisher)
        } catch (err) {
            console.log(err);
        }
    }

    //update the data 
    const updateBook = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'))
            const token = user.token
            const response = await axios.put(`http://localhost:5050/${params.id}`, {
                title,
                isbn,
                author,
                description,
                publishedDate,
                publisher
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                navigate('/')
            }
        } catch (err) {
            console.log(err);
        }
    }



    return (
        <div className='updateComponent'>
            <Link to='/' className='link'>Show Book List</Link>
            <h1>Edit Book</h1>
            <p>Update's book info</p>

            <p>Title</p>
            <input
                type="text"
                placeholder='Title of the book'
                value={title}
                onChange={(e) => setTitle(e.target.value)} />

            <p>ISBN</p>
            <input
                type="text"
                placeholder='ISBN'
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)} />

            <p>Author</p>
            <input type="text"
                placeholder='Author'
                value={author}
                onChange={(e) => setAuthor(e.target.value)} />

            <p>Description</p>
            <input type="text"
                placeholder='Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)} />

            <p>Published Date</p>
            <input type="date"
                placeholder='Published Date'
                value={publishedDate}
                onChange={(e) => setPublishedDate(e.target.value)} />

            <p>Publisher</p>
            <input type="text"
                placeholder='Publisher'
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)} />

            <button onClick={updateBook}>Update Book</button>
        </div>
    )
}
