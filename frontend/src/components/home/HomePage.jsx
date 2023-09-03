import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../resources/logo.webp'

const HomePage = () => {
  return (
    // <div className=" min-h-screen flex items-center justify-center">
    //   <div className="text-center">
    //     <h1 className="text-4xl font-extrabold mb-4">Welcome to Pizza Delight</h1>
    //     <p className="text-gray-300 text-lg mb-8">Order the most delicious pizzas in town!</p>
    //     <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg">
    //       Order Now
    //     </button>
    //   </div>
    // </div>
    <div className="bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white min-h-screen flex items-center justify-center">
      <div className="bg-gray-500 rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-semibold text-gray-900">Welcome to Pizza Factory</h1>
          <p className="text-gray-900 mt-2">Order the best pizza in town!</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="mb-4">
            <img
              src={logo}
              alt="Delicious Pizza"
              className="rounded-lg w-96 h-auto"
            />
          </div>
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-2xl font-semibold mb-4 text-center">Explore Our Menu</h2>
            <p className="text-white">
              From classic Margherita to gourmet specialties, we have a pizza for every taste.
            </p>
            <Link to='/login' className="mt-4 w-60 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 text-center rounded">
              Order Now
            </Link>
          </div>
        </div>
      </div>
    </div>
    // <div className="bg-gray-100 h-screen flex flex-col justify-center items-center">
    //   <div className="bg-white rounded-lg p-8 shadow-md">
    //     <h1 className="text-3xl font-semibold mb-4">Welcome to Pizza Factory!</h1>
    //     <p className="text-gray-600 mb-4">
    //       Order delicious pizzas online and have them delivered to your doorstep.
    //     </p>
    //     <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded">
    //       Order Now
    //     </button>
    //   </div>
    //   {/* <Link to='/login'>Log in</Link>
    //   <Link to='/signup'>Sign up</Link> */}
    // </div>
  )
}

export default HomePage