import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/AuthContext';
import { fetchOrders } from '../../apiCalling/pizza';
import AdminOrders from '../common/AdminOrders';

const OrderReceived = () => {
  const [pizzaData, setPizzaData] = useState([])
  const {token} = useContext(AuthContext);
  const fetchData = async () => {
    const response = await fetchOrders("/getOrders", token);
    if(response.data.order){
      setPizzaData(response.data.order);
    }
    console.log(pizzaData)
  }
  useEffect(() => {
    fetchData();
  }, [])
  return (
    <div className='bg-gray-800 h-[100vh] w-full'>
      {
        pizzaData?.map((data, index)=> {
          return <AdminOrders data={data} key={index} />
        })
      }
    </div>
  )
}

export default OrderReceived