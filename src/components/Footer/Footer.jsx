import React from 'react'
import Logo from "../../assets/Logo.png"
function Footer() {

  return (
    <div className='container py-9'>
      <div className='flex justify-between items-center' >
        <div className='basis-1/3' >
          <img src={Logo} className='md:w-[70%] w-[90%] ' alt="" srcset="" />
        </div>
        <div className='basis-2/3' >
          <p className='md:text-sm text-xs tracking-tight text-end font-semibold ' >©2022 Earth. All right reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default Footer;