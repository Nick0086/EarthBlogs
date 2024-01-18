import React from 'react'
import Button from '../Button'
import { useNavigate } from 'react-router-dom'

function DeshBordHeader() {

    const navigate = useNavigate()

  return (
    <div className='w-full py-2 px-3'>
        <Button onClick={() => navigate('/') } >Home</Button>
    </div>
  )
}

export default DeshBordHeader