import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext';

const AdminPanel = () => {
  const { userData } = useContext(AuthContext);
  return (
    <div>AdminPanel</div>
  )
}

export default AdminPanel