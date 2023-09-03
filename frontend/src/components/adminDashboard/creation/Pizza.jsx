import React, { useContext, useState } from 'react'
import AuthContext from '../../../context/AuthContext';
import { create } from '../../../apiCalling/pizza';
import { toast } from 'react-hot-toast';

const Pizza = () => {
  const [name, setName] = useState("");
  const [base, setBase] = useState("");
  const [sauce, setSauce] = useState("");
  const [cheese, setChese] = useState("");
  const [veggies, setVeggies] = useState("");
  const [quantity, setQuantity] = useState("");
  const {userData} = useContext(AuthContext);
  const token = userData.token;
  const submitHandler = async (event) => {
    event.preventDefault();
    const body = {name, base, sauce, cheese, veggies};
    const response = await create('/createPizza', body, token)
    if(response){
      toast.success("Pizza Created!");
    }
  }
  return (
    <div className='w-[90%] h-[86vh] text-white text-center rounded-xl mt-2 p-5 space-y-4 text-xl flex-col items-center justify-center bg-gray-600'>
      <div className='flex'>
        <div>
          <p>Create New Pizza</p>
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
            <div className='flex items-center gap-3 mb-1'>
              <label>Base:</label>  
              <select name='base' onSelect={(e) => {setBase(e.target.value)}} className="w-full rounded-[0.5rem] bg-slate-800 p-[12px]"> 
                <option value="">--Please choose an option--</option> 
                <option value="Very Small">Very Small</option>  
                <option value="Small">Small</option>  
                <option value="Medium">Medium</option>  
                <option value="Large">Large</option>  
                <option value="Extra Large">Extra Large</option>  
              </select>  
            </div>
            <div className='flex items-center gap-3 mb-1'>
              <label>Sauce:</label>  
              <select name='sauce' onSelect={(e) => {setSauce(e.target.value)}} className="w-full rounded-[0.5rem] bg-slate-800 p-[12px]"> 
                <option value="">--Please choose an option--</option> 
                <option value="Very Small">Very Small</option>  
                <option value="Small">Small</option>  
                <option value="Medium">Medium</option>  
                <option value="Large">Large</option>  
                <option value="Extra Large">Extra Large</option>  
              </select>  
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

export default Pizza