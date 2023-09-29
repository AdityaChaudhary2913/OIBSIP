import React from 'react'

const AdminOrders = ({data, obj}) => {
  return (
    <div className='text-white mx-auto flex items-center justify-evenly'>
      <div>
        <img src={data.pizza?.image} alt='' className='w-20 h-20' />
      </div>
      <div>
        <p>Name: {data.pizza.name}</p>
        <p>Quantity: {data.pizza.quantity}</p>
        <p>Price: {data.pizza.price}</p>
        <p>Status: {data.status}</p>
      </div>
      <div>
        <p>User: {obj.firstName} {obj.lastName}</p>
        <p>Email: {obj.email}</p>
      </div>
    </div>
  )
}

export default AdminOrders