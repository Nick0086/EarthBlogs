import React from 'react'

function Button({
    children,
    type="button",
    classname="",
    ...propes
}) {
  return (
    <button {...propes} type={type}  className={` bg-light-green duration-500 ease-in-out hover:bg-dark-green uppercase text-white
    md:w-[160px]  md:p-3 p-2 ${classname}`} >{children}</button>
  )
}

export default Button