import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom'

export default function GetBookDetail() {

    const [books, setBooks] = useState("")
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getBooks()
    }, [id])

    const getBooks = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'))
            const token = user.token

            const response = await axios.get(`http://localhost:5050/${id}`, {
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


    //delete book
    const deleteBook = async (id) => {
        console.log(id);
        try {
            const user = JSON.parse(localStorage.getItem('user'))
            const token = user.token
            const response = await axios.delete(`http://localhost:5050/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                await getBooks()
                navigate('/')
            }

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='getbookdetails'>
            <Link to='/' className='link'>Show Book List</Link>

            <h1>Book's Record</h1>
            <h4>Book info</h4>

            <table>
                <tr>
                    <td>1</td>
                    <td>Title</td>
                    <td>{books.title}</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Author</td>
                    <td>{books.author}</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>ISBN</td>
                    <td>{books.isbn}</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>Publisher</td>
                    <td>{books.publisher}</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>Published Date</td>
                    <td>{books.updatedAt}</td>
                </tr>
                <tr>
                    <td>6</td>
                    <td>Description</td>
                    <td>{books.description}</td>
                </tr>
            </table>
            <div className='button'>
                <button onClick={() => deleteBook(books._id)} >Delete</button>
                <Link to={'/update/' + books._id} className='update'>Edit Book</Link>
            </div>
        </div>
    )
}
