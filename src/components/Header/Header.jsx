import React, { useEffect } from 'react'
import Logo from "../../assets/Logo.png"
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import "./Header.css"

function Header() {

    const authStatus = useSelector((state) => state.auth.status);
    console.log("authStatus", authStatus)

    useEffect(() => {
        // Function to be executed when the component mounts or updates
        window.addEventListener('scroll', isSticky);
        return () => {
            // Cleanup function to be executed when the component unmounts or updates
            window.removeEventListener('scroll', isSticky);
        };
    });

    const isSticky = (e) => {
        const header = document.querySelector('.header-section');
        const scrollTop = window.scrollY;
        scrollTop >= 250 ? header.classList.add('is-sticky') : header.classList.remove('is-sticky');
    };



    const headerData = [
        {
            name: "home",
            to: "/",
            authStatus: true
        },
        {
            name: "Sign Up",
            to: "/signup",
            authStatus: !authStatus,
        },
        {
            name: "Login",
            to: "/login",
            authStatus: !authStatus,
        },
        {
            name: "Add Post",
            to: "/createblog",
            authStatus: authStatus,
        }
    ]


    return (
        <header className=' absolute w-full z-50 py-4  header-section' >
            <div className='container' >
                <div className='flex justify-between items-center' >
                    <div>
                        <Link to="/" >
                            <img src={Logo} className='md:w-3/4' alt="logo" />
                        </Link>
                    </div>
                    <nav>
                        <ul className='flex justify-between items-center' >
                            {
                                headerData.map((data) =>

                                    data.authStatus ? (
                                        <Link key={data.name} className='ms-8 capitalize' to={data.to} >{data.name}</Link>
                                    ) : null
                                )
                            }
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header