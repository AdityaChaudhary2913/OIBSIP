import React from 'react'
import cross from '../../resources/times.svg'
import { deleteOrder } from '../../apiCalling/pizza'

const MyOrderCard = ({data}) => {
  const id = data._id;
  const body={id}
  const deleteHandler = async (ev) => {
    ev.preventDefault()
    console.log(data)
    const response = await deleteOrder("/deleteOrder", body)
    console.log(response)
  }
  return (
    <div className='text-white w-[80%] mx-auto flex items-center justify-evenly'>
      <div>
        <img src={data.pizza.image} alt='' className='w-20 h-20' />
      </div>
      <div>
        <p>Name: {data.pizza.name}</p>
        <p>Quantity: {data.pizza.quantity}</p>
        <p>Price: {data.pizza.price}</p>
        <p>Status: {data.status}</p>
      </div>
      <button onClick={deleteHandler}>
        <img src={cross} alt="" className='w-10 h-10' />
      </button>
    </div>
  )
}

export default MyOrderCard