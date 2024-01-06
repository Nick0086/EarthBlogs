import React from 'react'

function Button({
    children,
    type="button",
    classname="",
    ...propes
}) {
  return (
    <button {...propes} type={type} className={` bg-light-green duration-500 ease-in-out hover:bg-dark-green capitalize text-white
    md:w-[160px] w-[140px] p-3 ${classname}`} >{children}</button>
  )
}

export default Button