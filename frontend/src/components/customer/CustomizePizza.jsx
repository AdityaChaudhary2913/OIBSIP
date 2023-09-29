import React, { useContext, useState } from 'react'
import Navbar from '../common/Navbar'
import AuthContext from '../../context/AuthContext';
import { fetchPrice, orderPizza } from '../../apiCalling/pizza';
import { toast } from 'react-hot-toast';

const CustomizePizza = () => {
  const [name, setName] = useState("");
  const [base, setBase] = useState("");
  const [sauce, setSauce] = useState("");
  const [cheese, setCheese] = useState("");
  const [veggies, setVeggies] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [pizzaPrice, setPizzaPrice] = useState("");
  const {token} = useContext(AuthContext);
  const priceCalci = async (event) => {
    event.preventDefault();
    const body = {name, base, sauce, cheese, veggies, quantity};
    const response = await fetchPrice('/customerCreation', body, token)
    setPizzaPrice(response)
  }
  const submitHandler = async (event) => {
    event.preventDefault();
    const body = {name, base, sauce, cheese, veggies, quantity, price};
    const response = await orderPizza('/placeOrder', body, token)
    if(response){
      toast.success("Pizza Created!");
    }
  }

  return (
    <div className='text-white h-screen text-center text-xl flex-col items-center justify-center bg-gray-900'>
      <Navbar />
      <div className='flex-col space-y-5 p-10'>
        <p className='text-2xl'>Create Your New Pizza</p>
              <div className='h-1 bg-slate-700 rounded-full w-full'></div>
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
              <select name='base' onChange={(e) => {setBase(e.target.value)}} className="w-full rounded-[0.5rem] bg-slate-800 p-[12px]"> 
                <option value="">--Please choose an option--</option> 
                <option value="Very Small">Very Small</option>  
                <option value="Small">Small</option>  
                <option value="Medium">Medium</option>  
                <option value="Large">Large</option>  
                <option value="Extra Large">Extra Large</option>  
              </select>  
            </div>
            <div className='flex items-center gap-3 mb-1'>
              <label>Cheese:</label>  
              <select name='cheese' onChange={(e) => {setCheese(e.target.value)}} className="w-full rounded-[0.5rem] bg-slate-800 p-[12px]"> 
                <option value="">--Please choose an option--</option> 
                <option value="Mozzarella">Mozzarella</option>  
                <option value="Aged Havarti">Aged Havarti</option>  
                <option value="Gorgonzola">Gorgonzola</option>  
                <option value="Parmigiano-Reggiano">Parmigiano-Reggiano</option>  
                <option value="Provolone">Provolone</option>  
              </select>  
            </div>
            <div className='flex items-center gap-3 mb-1'>
              <label>Sauce:</label>  
              <select name='sauce' onChange={(e) => {setSauce(e.target.value)}} className="w-full rounded-[0.5rem] bg-slate-800 p-[12px]"> 
                <option value="">--Please choose an option--</option> 
                <option value="Tomato">Tomato</option>  
                <option value="Creamy Alfredo">Creamy Alfredo</option>  
                <option value="Pesto">Pesto</option>  
                <option value="Mayonnaise">Mayonnaise</option>  
                <option value="Robust">Robust</option>  
              </select>
            </div>
            <div className='flex items-center gap-3 mb-1'>
              <label>Veggies:</label>  
              <select name='veggies' multiple size={5}
                    onChange={(e) => {
                      const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
                      setVeggies(selectedOptions);
                    }}
                    className="w-full rounded-[0.5rem] bg-slate-800 p-[12px]">
                <option value="">--Select Multiple options--</option>  
                <option value="Pepper">Pepper</option>  
                <option value="Mashroom">Mashroom</option>  
                <option value="Onion">Onion</option>  
                <option value="Tomato">Tomato</option>  
                <option value="Spinach">Spinach</option>  
              </select>
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
            <p>Price: {pizzaPrice}</p>
            <button onClick={priceCalci} className='bg-green-500 rounded-2xl py-3 w-[30%] px-5'>Calculate Price</button>
            <button type='submit' className='bg-green-500 rounded-2xl py-3 w-[30%] px-5'>Place Order</button>
        </form>
      </div>
    </div>
  )
}

export default CustomizePizza