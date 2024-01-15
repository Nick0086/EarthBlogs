import React from 'react'
import {DeshBordHeader, AdminPostShow } from "../components/index"

function DashboardPage() {
  return (
    <div className='grid grid-cols-12'>
      <div className='col-span-3 bg-black'></div>
      <div className='col-span-9 border'>
        <DeshBordHeader/>
        <AdminPostShow />
      </div>
    </div>
  )
}

export default DashboardPage;