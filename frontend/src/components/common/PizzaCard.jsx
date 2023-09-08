import React, { useContext } from 'react'
import { orderPizza } from '../../apiCalling/pizza'
import AuthContext from '../../context/AuthContext'

const PizzaCard = ({data}) => {
  const {userData, token} = useContext(AuthContext);
  const order = async () => {
    const pizzaId = `${ data._id }`;
    const userId = userData.id;
    const body = {pizzaId, userId}
    const response = await orderPizza("/placeOrder", body, token)
    console.log("response: ", response )
  }
  return (
    <div className='text-white bg-slate-500 rounded-2xl p-3 flex flex-wrap w-[20%] '>
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
        <button onClick={order} ><p className='bg-green-500 px-2 rounded-xl'>Order</p></button>
      </div>
    </div>
  )
}

export default PizzaCard