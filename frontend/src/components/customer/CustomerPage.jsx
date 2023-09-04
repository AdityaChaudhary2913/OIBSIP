import React, { useContext } from 'react'
import Navbar from '../common/Navbar'
import AuthContext from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';

const CustomerPage = () => {
  const {userData} = useContext(AuthContext);
  const navigate = useNavigate();
  if(userData?.userType === "Admin"){
    navigate('/adminPanel');
  }
  return (
    <div className='h-screen w-full bg-gradient-to-b from-[#1f2728] via-[#131618] to-[#070808]'>
      <Navbar />
    </div>
  )
}

export default CustomerPage