import React, { useContext, useState } from 'react'
import AuthContext from '../../../context/AuthContext';
import { create } from '../../../apiCalling/pizza';
import { toast } from 'react-hot-toast';

const Veggies = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const {userData} = useContext(AuthContext);
  const token = userData.token;
  const submitHandler = async (event) => {
    event.preventDefault();
    const body = {name, quantity};
    const response = await create('/createVeggies', body, token)
    if(response){
      toast.success("Veggies Created!");
    }
  }
  return (
    <div className='w-[90%] h-[86vh] text-white text-center rounded-xl mt-2 p-5 space-y-4 text-xl flex-col items-center justify-center bg-gray-600'>
      <div className='flex'>
        <div>
          <p>Create New Veggie</p>
          <form onSubmit={submitHandler}>
            <div className='flex items-center gap-3 mb-1'>
              <label htmlFor='name'>Name:</label>
              <input 
                name='name'
                type='text'
                id='name'
                placeholder='Name'
                value={name}
                onChange={(e)=>{setName(e.target.value)}}
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
            <button type='submit' className='bg-green-500 rounded-2xl py-3 w-[30%] px-5'>Create</button>
          </form>
        </div>
        <div>

        </div>
      </div>
      <div className='h-1 bg-slate-700 rounded-full w-full'></div>
      <div>sd</div>
    </div>
  )
}

export default Veggies