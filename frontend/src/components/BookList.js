import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

export default function BookList() {

    const [books, setBooks] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getBooks()
    }, [])

    const getBooks = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'))
            const token = user.token

            const response = await axios.get('https://book-list-backend-0buz.onrender.com?cache=' + Date.now(), {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setBooks(response.data)
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    const handleBook = (id) => {
        console.log(id);
        navigate(`/getbook/${id}`)
    }

    return (
        <div>
            <h1 className='bookslist-heading'>Books List</h1>
            <Link to='/add' className='link'>+ Add New Book</Link>
            <div className='book-container'>
                {
                    books.map((book) => {
                        return (
                            <div key={book._id} onClick={() => handleBook(book._id)} className='book'>
                                <img src='https://edit.org/images/cat/book-covers-big-2019101610.jpg' className='img' />
                                <h3>{book.title}</h3>
                                <h3>{book.author}</h3>
                                <h3>{book.description}</h3>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}
