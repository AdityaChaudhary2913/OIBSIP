// import React, { useContext } from 'react'
// import { orderPizza } from '../../apiCalling/pizza'
// import AuthContext from '../../context/AuthContext'
// import { buyCourse } from '../../apiCalling/payment';

// const PizzaCard = ({data}) => {
//   const {userData, token} = useContext(AuthContext);
//   const pizzaId = `${ data._id }`;
//   const body = {pizzaId}
//   const order = async () => {
//     if(token){
//       const res = await buyCourse(body, token, userData);
//       console.log(res)
//     }
//   }
//   return (
//     <div className='text-white bg-slate-500 rounded-2xl p-3 flex flex-wrap w-[20%] '>
//       <img src={`${data.image}`} alt='Pizza' className='mx-auto' />
//       <div>
//         <p>Name: {data.name}</p>
//         <p>Base: {data.base}</p>
//         <p>Sauce: {data.sauce}</p>
//         <p>Cheese: {data.cheese}</p>
//         <p>Veggies: {data.veggies}</p>
//       </div>
//       <div className='m-auto text-center text-2xl'>
//         <p>Price: {data.price}</p>
//         <button onClick={order} ><p className='bg-green-500 px-2 rounded-xl'>Order</p></button>
//       </div>
//     </div>
//   )
// }

// export default PizzaCard
import React, { useContext, useState } from 'react';
import { buyCourse } from '../../apiCalling/payment';
import AuthContext from '../../context/AuthContext';
import {loadStripe} from '@stripe/stripe-js';
import axios from 'axios';
import { orderPizza } from '../../apiCalling/pizza';

const PizzaCard = ({ data }) => {
  const { userData, token } = useContext(AuthContext);
  const pizzaId = `${data._id}`;
  const userId = `${userData.id}`
  const body = { pizzaId, userId };
  const order = async (e) => {
    console.log(data)
    e.preventDefault();
    if (token) {
      try {
        const orderResponse = await orderPizza("/placeOrder", body, token)
        console.log(orderResponse);
      } catch (error) {
        console.error('Error placing order:', error);
      }
    }
  };

  const makePayment = async () => {
    const stripe = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY)
    const response = await axios.post("http://localhost:8000/payment/createPayment", data, {headers: {
      Authorization: `Bearer ${token}`
    }});
    console.log(response)
    const result = stripe.redirectToCheckout({
      sessionId: response.data.id
    })
    if(result.error){
      console.log(result.error)
    }
  }

  return (
    <div className='text-white bg-slate-500 rounded-2xl p-3 flex-col justify-center items-center w-[20%]'>
      <img src={`${data.image}`} alt='Pizza' className='mx-auto' />
      <div className='flex justify-center items-center'>
        <div>
          <p>Name: {data.name}</p>
          <p>Base: {data.base.name}</p>
          <p>Sauce: {data.sauce.name}</p>
          <p>Cheese: {data.cheese.name}</p>
          <p>Veggies: {data.veggies}</p>
        </div>
        <div className='m-auto text-center text-2xl'>
          <p>Price: {data.price}</p>
          {token ? (
            <button onClick={order}>
              <p className='bg-green-500 px-2 rounded-xl'>Order</p>
            </button>
          ) : (
            <p>Please log in to place an order.</p>
            )}
        </div>
      </div>
    </div>
  );
};

export default PizzaCard;
