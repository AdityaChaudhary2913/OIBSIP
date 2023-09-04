import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../../context/AuthContext';
import { create, fetchPizza } from '../../../apiCalling/pizza';
import { toast } from 'react-hot-toast';

const Veggies = () => {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [frequency, setFrequency] = useState("");
  const [veggiesData, setVeggiesData] = useState([])
  const {userData} = useContext(AuthContext);
  const token = userData.token;
  const submitHandler1 = async (event) => {
    event.preventDefault();
    const body = {name1, quantity, price};
    console.log(body)
    const response = await create('/createVeggies', body, token)
    if(response){
      toast.success("Veggies Created!");
    }
    setName1("");
    setQuantity("");
    setPrice("")
  }
  const submitHandler2 = async (event) => {
    event.preventDefault();
    const body = {name2, frequency};
    const response = await create('/addVeggies', body, token)
    if(response){
      toast.success("Veggies Added!");
    }
    setName2("");
    setFrequency("");
  }
  const fetchData = async () => {
    const response = await fetchPizza("/getAllVeggies");
    setVeggiesData(response);
  }
  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className='w-[90%] h-[86vh] text-white text-center rounded-xl mt-2 p-5 space-y-4 text-xl flex-col items-center justify-center bg-gray-600'>
      <div className='flex justify-evenly'>
        <div>
          <p>Create New Veggies</p>
          <form onSubmit={submitHandler1}>
            <div className='flex items-center gap-3 mb-1'>
              <label htmlFor='name1'>Name:</label>
              <input 
                name='name1'
                type='text'
                id='name1'
                placeholder='Name'
                value={name1}
                onChange={(e)=>{setName1(e.target.value)}}
                className="w-full rounded-[0.5rem] bg-slate-800 p-[12px]"
              />
            </div>
            <div className='flex items-center gap-3 mb-2'>
              <label htmlFor='quantity'>Quantity:</label>
              <input 
                name='quantity'
                type='number'
                id='quantity'
                placeholder='Quantity'
                value={quantity}
                onChange={(e)=>{setQuantity(e.target.value)}}
                className="w-full rounded-[0.5rem] bg-slate-800 p-[12px]"
              />
            </div>
            <div className='flex items-center gap-3 mb-2'>
              <label htmlFor='price'>Price:</label>
              <input 
                name='price'
                type='number'
                id='price'
                placeholder='Price'
                value={price}
                onChange={(e)=>{setPrice(e.target.value)}}
                className="w-full rounded-[0.5rem] bg-slate-800 p-[12px]"
              />
            </div>
            <button type='submit' className='bg-green-500 rounded-2xl py-3 w-[30%] px-5'>Create</button>
          </form>
        </div>
        <div>
          <p>Add Veggies</p>
          <form onSubmit={submitHandler2}>
            <div className='flex items-center gap-3 mb-1'>
              <label htmlFor='name2'>Name:</label>
              <input 
                name='name2'
                type='text'
                id='name2'
                placeholder='Name'
                value={name2}
                onChange={(e)=>{setName2(e.target.value)}}
                className="w-full rounded-[0.5rem] bg-slate-800 p-[12px]"
              />
            </div>
            <div className='flex items-center gap-3 mb-2'>
              <label htmlFor='frequency'>Amount:</label>
              <input 
                name='frequency'
                type='number'
                id='frequency'
                placeholder='Amount'
                value={frequency}
                onChange={(e)=>{setFrequency(e.target.value)}}
                className="w-full rounded-[0.5rem] bg-slate-800 p-[12px]"
              />
            </div>
            <button type='submit' className='bg-green-500 rounded-2xl py-3 w-[30%] px-5'>Add</button>
          </form>
        </div>
      </div>
      <div className='h-1 bg-slate-700 rounded-full w-full'></div>
      <div className='overflow-auto'>
        <p className='text-2xl text-yellow-300 underline mb-3'>Veggies Stock</p>
        {
          veggiesData.map((item) => (
            <div key={item._id} className='flex justify-center gap-2'>
              <p>Name: {item.name}</p>
              <p>Price: {item.price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Veggies