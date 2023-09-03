import React, { useContext } from 'react'
import logo from '../../resources/logo.webp'
import AuthContext from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../apiCalling/auth';

const Navbar = () => {
  const { userData, setUserData } = useContext(AuthContext);
  const navigate = useNavigate();
  const logoutHandler = async () => {
    logout(navigate, setUserData);
  }
  return (
    <div className='bg-gray-600 text-white p-5  rounded-lg flex justify-between items-center'>
      <div>
        <img src={logo} alt='Pizza Factory' className='w-20' />
      </div>
      <div className='text-3xl'>
        {
          userData?.userType === "Admin" ? (<p>Admin Panel</p>) : (<p>Pizza Factory</p>)
        }
      </div>
      <div>
        <div className='flex justify-between gap-2'>
          <Link to='/dashboard'>My Profile</Link>
          <Link to='/cart' >{userData?.userType === "Admin" ? (<p>Orders</p>) : (<p>My Orders</p>)}</Link>
          <button onClick={logoutHandler} >Logout</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar