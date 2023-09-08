import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext'

const ProfilePage = () => {
  const {userData} = useContext(AuthContext);
  return (
    <div className='text-white m-auto text-2xl space-y-6 flex-col items-center justify-center text-center '>
      <div>
        <img src={`${userData.image}`} alt='DisplayPicture' className='rounded-full w-40 m-auto' />
      </div>
      <p>Account Type: {userData.role}</p>
      <p>Name: {userData.firstName} {userData.lastName}</p>
      <p>Email: {userData.email}</p>
    </div>
  )
}

export default ProfilePage