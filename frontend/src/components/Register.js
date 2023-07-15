import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

export default function Register() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const auth = localStorage.getItem('user')
        if (auth) {
            navigate('/login')
        }
    }, [navigate])


    const collectData = async () => {
        console.log(username, password, confirmPassword);
        if (password !== confirmPassword) {
            setError('Password do not match')
            return
        }
        try {
            const response = await axios.post('http://localhost:5050/register', {
                username,
                password
            })
            console.log(response.data);
            localStorage.setItem('user', JSON.stringify(response))
            if (response.status === 200) {
                navigate('/login')
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message)
            } else {
                setError("An error occured. Please try again later")
            }
        }
    }

    return (
        <div className='registerMain'>
            <h1 className='register'>Register</h1>
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
                <input
                    type="text"
                    placeholder='Confirm password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {error && <div>{error}</div>}
                <button
                    type='button'
                    onClick={collectData}
                    className='registerButton'
                >Register</button>
                <Link to="/login" className='link'>Login</Link>
            </div>

        </div>
    )
}
