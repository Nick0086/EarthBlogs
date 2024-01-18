import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from "../../assets/Logo.png"

function DashBoardAsideBar() {

    

    const AsideBarMenu = [
        {
            name:"Dashboard",
            path:"/dashboard"
        },
        {
            name:"Posts",
            path:"/category/Posts"
        },
        {
            name:"Personal",
            path:"/category/Personal"
        },
        {
            name:"News",
            path:"/category/News"
        },
        {
            name:"Sport",
            path:"/category/Sport"
        },
        {
            name:"Travel",
            path:"/category/Travel"
        },
        {
            name:"Food",
            path:"/category/Food"
        },
        {
            name:"Fashion",
            path:"/category/Fashion"
        },
        {
            name:"Finance",
            path:"/category/Finance"
        },
        {
            name:"Music",
            path:"/category/Music"
        },
        {
            name:"Business",
            path:"/category/Business"
        },
        {
            name:"Lifesyle",
            path:"/category/Lifesyle"
        }
]

  return (
    <div className='p-4' >
        <div className='mb-6' >
            <Link className='text-5xl font-bold tracking-wider text-white' >  
                EARTH
            </Link>
        </div>
        <div>
            <ul>
            {
                AsideBarMenu && AsideBarMenu.map((menu)=> (
                    <li key={menu.name} className='mb-2 text-base font-medium' >
                        <NavLink to={menu.path} className={({isActive}) => `block p-2 duration-100 ease-in-out  ${isActive ? "text-black bg-[#EEBBC3] rounded-lg" : "text-white"}` } >{menu.name}</NavLink>
                    </li>
                ))
            }
            </ul>
        </div>
    </div>
  )
}

export default DashBoardAsideBar