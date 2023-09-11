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
import React, { useContext } from 'react';
import { buyCourse } from '../../apiCalling/payment';
import AuthContext from '../../context/AuthContext';

const PizzaCard = ({ data }) => {
  const { userData, token } = useContext(AuthContext);
  const pizzaId = `${data._id}`;
  const body = { pizzaId };

  const order = async (e) => {
    console.log(data)
    e.preventDefault();
    if (token) {
      try {
        const orderResponse = await buyCourse(body, token, userData);
        console.log(orderResponse);
      } catch (error) {
        console.error('Error placing order:', error);
      }
    }
  };

  return (
    <div className='text-white bg-slate-500 rounded-2xl p-3 flex-col justify-center items-center w-[20%]'>
      <img src={`${data.image}`} alt='Pizza' className='mx-auto' />
      <div>
        <p>Name: {data.name}</p>
        <p>Base: {data.base}</p>
        <p>Sauce: {data.sauce}</p>
        <p>Cheese: {data.cheese}</p>
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
  );
};

export default PizzaCard;
