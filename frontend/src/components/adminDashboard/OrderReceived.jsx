import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/AuthContext';
import { fetchOrders } from '../../apiCalling/pizza';
import AdminOrders from '../common/AdminOrders';

const OrderReceived = () => {
  const [pizzaData, setPizzaData] = useState([])
  const [userD, setUserD] = useState({});
  const {token} = useContext(AuthContext);
  const fetchData = async () => {
    const response = await fetchOrders("/getOrders", token);
    if(response.data.order){
      setPizzaData(response.data.order);
      const obj = {firstName:response.data.firstName, lastName:response.data.lastName, email:response.data.email};
      setUserD(obj)
      console.log("User Data is ", response )
    }
  }
  useEffect(() => {
    fetchData();
  }, [])
  return (
    <div className='bg-gray-800 h-[100vh] w-full'>
      {
        pizzaData.length === 0 && (<p className='flex items-center justify-center mt-20 text-5xl text-white'>No order received yet!</p>)
      }
      {
        pizzaData?.map((data, index)=> {
          return <AdminOrders data={data} obj={userD} key={index} />
        })
      }
    </div>
  )
}

export default OrderReceived