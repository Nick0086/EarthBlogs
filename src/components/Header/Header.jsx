import React, { useEffect } from 'react'
import Logo from "../../assets/Logo.png"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import "./Header.css"
import Button from '../Button'
import authService, { AuthService } from '../../Appwrite/Auth'
import { logout } from '../../store/authSlice'

function Header({changeHandler}) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authStatus = useSelector((state) => state.auth.status);

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
        },
        {
            name: "dashboard",
            to: "/dashboard",
            authStatus: authStatus,
        }
    ]

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


    const logOutHandler = async () => {
        changeHandler(true)
        try {
            authService.logout()
            .then((res) => dispatch(logout()))
            .catch((err) => console.log(err.message))
            .finally(() => changeHandler(false))
            navigate('/');
        } catch (error) {
            console.log("Logout error",error)
        }
    }


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
                                        <Link key={data.name} className={`mx-4 capitalize `} to={data.to} >{data.name}</Link>
                                    ) : null
                                )
                            }
                            {
                                    authStatus && <Button onClick={logOutHandler} classname='ms-4 font-normal md:w-[75px] md:py-2 rounded-xl capitalize'>Logout</Button>
                            }
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header