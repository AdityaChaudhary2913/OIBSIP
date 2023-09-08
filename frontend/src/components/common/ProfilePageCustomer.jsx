import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext'
import Navbar from './Navbar';

const ProfilePageCustomer = () => {
  const {userData} = useContext(AuthContext);
  return (
    <div className='bg-black'>
      <Navbar />
      <div className='text-white m-auto text-2xl space-y-6 flex-col items-center justify-center text-center h-screen pt-40'>
        <div>
          <img src={`${userData.image}`} alt='DisplayPicture' className='rounded-full w-40 m-auto' />
        </div>
        <p>Account Type: {userData.role}</p>
        <p>Name: {userData.firstName} {userData.lastName}</p>
        <p>Email: {userData.email}</p>
      </div>
    </div>
  )
}

export default ProfilePageCustomer