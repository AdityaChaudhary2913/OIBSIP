import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/AuthContext';
import Navbar from '../common/Navbar';
import MyOrderCard from '../common/MyOrderCard';
import axios from 'axios';
import { getMyOrder } from '../../apiCalling/pizza';

const MyOrders = () => {
  const [pizzaData, setPizzaData] = useState([])
  const {userData, token} = useContext(AuthContext);
  const id = userData.id
  const body = {id}
  const fetchData = async () => {
    const response = await getMyOrder(token);
    if(response){
      setPizzaData(response.data.order);
    }
  }
  useEffect(() => {
    fetchData();
  }, [])
  return (
    <div className='bg-gray-800 h-[100vh]'>
      <Navbar />
      {
        pizzaData.length === 0 && (<p className='flex items-center justify-center mt-20 text-5xl text-white'>You have ordered nothing yet!</p>)
      }
      {
        pizzaData.length !== 0 && (
        pizzaData?.map((data, index)=> {
          return <MyOrderCard data={data} key={index} />
        })
        )
      }
    </div>
  )
}

export default MyOrders