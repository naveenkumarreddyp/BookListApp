import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from "axios"

export default function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const auth = localStorage.getItem('user')
        if (auth) {
            navigate('/')
        }
    }, [navigate])

    const handleLogin = (event) => {
        event.preventDefault()
        axios.post('http://localhost:5050/login', {
            username,
            password
        })
            .then((res) => {
                console.log(res);
                setToken(res.data.token)
                const data = {
                    token: res.data.token
                }
                localStorage.setItem('user', JSON.stringify(res.data))
                localStorage.setItem('token', JSON.stringify(data))
                navigate('/')
            }).catch((err => {
                setError(err.response.data.message)
            }))
    }


    return (
        < div className='registerMain'>
            <h1 className='register'>Login</h1>
            <div className="registerInput">

                <input
                    type="text"
                    placeholder='username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="text"
                    placeholder='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <div>{error}</div>}
                <button
                    type='button'
                    onClick={handleLogin}
                    className='registerButton'
                >Login</button>
                <Link to="/register" className='link'>Register</Link>
            </div>

        </ div>
    )
}

