import React from 'react'
import Logo from "../../assets/Logo.png"

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
                            <li>Home</li>
                            <li>Sign Up</li>
                            <li>Login</li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header