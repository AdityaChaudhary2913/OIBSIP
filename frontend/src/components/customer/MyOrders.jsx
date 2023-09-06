import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/AuthContext';
import { orderPizza } from '../../apiCalling/pizza';

const MyOrders = () => {
  const [pizzaData, setPizzaData] = useState([])
  const {userData} = useContext(AuthContext);
  const id = userData._id
  const body = {id}
  const fetchData = async () => {
    const response = await orderPizza("/getMyOrders", body);
    setPizzaData(response.data.order);
    console.log(pizzaData)
  }
  useEffect(() => {
    fetchData();
  }, [])
  return (
    <div>
      {
        
      }
    </div>
  )
}

export default MyOrders