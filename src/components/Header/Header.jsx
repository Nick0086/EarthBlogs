import React from 'react'
import Logo from "../../assets/Logo.png"
import { Link } from 'react-router-dom'

function Header() {
    return (
        <header className=' absolute w-full z-50' >
            <div className='container' >
                <div className='flex justify-between items-center' >
                    <div>
                        <a>
                            <img src={Logo} alt="logo" />
                        </a>
                    </div>
                    <nav>
                        <ul className='flex justify-between items-center' >
                            <Link to="/" >home</Link>
                            <Link to="/signup" >Sign Up</Link>
                            <Link to="/login" >Login</Link>
                            <Link to="/createblog">Add Post</Link>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header