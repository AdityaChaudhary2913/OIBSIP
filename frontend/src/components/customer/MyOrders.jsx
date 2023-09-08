import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/AuthContext';
import { orderPizza } from '../../apiCalling/pizza';
import Navbar from '../common/Navbar';
import MyOrderCard from '../common/MyOrderCard';

const MyOrders = () => {
  const [pizzaData, setPizzaData] = useState([])
  const {userData, token} = useContext(AuthContext);
  const id = userData.id
  const body = {id}
  const fetchData = async () => {
    const response = await orderPizza("/getMyOrders", body, token);
    if(response.data.order){
      setPizzaData(response.data.order);
    }
    console.log(pizzaData)
  }
  useEffect(() => {
    fetchData();
  }, [])
  return (
    <div className='bg-gray-800 h-[100vh]'>
      <Navbar />
      {
        pizzaData?.map((data, index)=> {
          return <MyOrderCard data={data} key={index} />
        })
      }
    </div>
  )
}

export default MyOrders