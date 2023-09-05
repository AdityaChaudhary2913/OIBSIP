import React from 'react'
import { Link } from 'react-router-dom'

const PizzaCard = ({data}) => {
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
        <Link to='/'><p className='bg-green-500 p-1 rounded-xl'>Order</p></Link>
      </div>
    </div>
  )
}

export default PizzaCard