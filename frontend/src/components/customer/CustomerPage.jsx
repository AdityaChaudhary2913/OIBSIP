import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../common/Navbar'
import AuthContext from '../../context/AuthContext'
import { Link } from 'react-router-dom';
import { fetchPizza } from '../../apiCalling/pizza';
import PizzaCard from '../common/PizzaCard';

const CustomerPage = () => {
  // const {userData} = useContext(AuthContext);
  // const navigate = useNavigate();
  // if(userData?.userType === "Admin"){
  //   navigate('/adminPanel');
  // }
  const [pizzaData, setPizzaData] = useState([])
  const fetchData = async () => {
    const response = await fetchPizza("/getAllPizza");
    setPizzaData(response);
  }
  useEffect(() => {
    fetchData();
  }, [])
  return (
    <div className='h-screen w-full bg-gradient-to-b from-[#1f2728] via-[#131618] to-[#070808]'>
      <Navbar />
      <p className='text-white text-center text-4xl'>Here are some available Pizza</p>
      <div className='flex justify-evenly mb-10 mt-5'>
        {
          pizzaData.map((pizza)=> (
            <PizzaCard key={pizza._id} data={pizza} />
          ))
        }
      </div>
      <p className='text-white text-center text-2xl'>You can customize your Pizza according to your own needs also</p>
      <Link to='/customizePizza'><p className='text-white text-center text-lg underline'>Click Here to Create New Pizza</p></Link>

    </div>
  )
}

export default CustomerPage