import React from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function Navbar() {
    const navigate = useNavigate()
    const auth = localStorage.getItem('user')


    const logout = () => {
        localStorage.clear()
        navigate('/login')
    }
    return (
        <div className='navbar'>
            {
                auth ? (
                    <>
                        <li>
                            <Link to='login' onClick={logout} >Logout</Link>
                        </li>
                    </>
                ) : (
                    <ul>
                    </ul>
                )
            }
        </div>
    )
}
