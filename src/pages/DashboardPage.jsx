import React from 'react'
import {DeshBordHeader, AdminPostShow } from "../components/index"
import DashBoardAsideBar from '../components/DashBoardAsideBar/DashBoardAsideBar';

function DashboardPage() {
  return (
    <div className='grid grid-cols-10 bg-[#232946]'>
      <div className='col-span-2 '>
        <DashBoardAsideBar/>
      </div>
      <div className='col-span-8 '>
        <DeshBordHeader/>
        <AdminPostShow />
      </div>
    </div>
  )
}

export default DashboardPage;