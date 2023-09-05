import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext';
import Navbar from '../common/Navbar';
import { Link, Outlet } from 'react-router-dom';

const AdminPanel = () => {
  const { userData } = useContext(AuthContext);
  return (
    <div className='h-screen w-full bg-gradient-to-b from-[#1f2728] via-[#131618] to-[#070808]'>
      <Navbar />
      <div className='flex gap-2 h-[85%]'>
        <div className='w-[10%] text-center rounded-xl mt-2 p-5 space-y-4 text-xl flex-col items-center justify-center bg-gray-600'>
          <div><Link to='/adminPanel/Cheese'>Cheese</Link></div>
          <div><Link to='/adminPanel/Sauce'>Sauce</Link></div>
          <div><Link to='/adminPanel/Veggies'>Veggie</Link></div>
          <div><Link to='/adminPanel/Base'>Base</Link></div>
          <div><Link to='/adminPanel/Pizza'>Pizza</Link></div>
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default AdminPanel