import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <>
      <div className=" bg-fuchsia-500 text-white p-2 ">
        <div className=" flex flex-wrap gap-4">
          <h4>MERN-App</h4>
            <ul className='flex flex-wrap gap-3'>
            <li><Link  to="/create"  className=''>Create-Post</Link></li>
            <li><Link to="/all">All-Post</Link></li>
            </ul>
        </div>
      </div>
    </>
  )
}

export default NavBar
