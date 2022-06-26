import React from 'react'
import Link from 'next/link';
import { FaPlus , FaMinus } from 'react-icons/fa';

const Checkout = ( {subTotal , RemoveFromCart , cart , addItems}) => {
  return (
    <div>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-12 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Checkout Now</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify.</p>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                  <input type="text" id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                  <input type="email" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone Number</label>
                  <input type="number" id="phone" name="phone" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
                  <input type="text" id="state" name="state" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="pin" className="leading-7 text-sm text-gray-600">Pin Code</label>
                  <input type="number" id="pin" name="pin" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
                  <input type="text" id="city" name="city" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
                  <textarea id="address" name="address" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                </div>
              </div>
              <div className="flex flex-col text-center w-full my-12">
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">View Cart</h1>
              </div>
              <div className=" bg-gray-50 px-10 pt-2 w-full rounded-lg">
                <ul className='mt-14 list-decimal'>
                  {/* items */}
                  {Object.keys( cart ).length <= 0 && <div className='my-5 text-center font-bold text-red-500'>Your cart is Empty!</div>}
                  {Object.keys( cart ).map( ( k ) => {
                    return <li key={k}><div className="flex my-6 justify-center items-center">
                      <div className="w-2/3 font-semibold flex justify-center items-center my-6">{cart[k].prodName}({cart[k].size}/{cart[k].varient})</div><div className="w-1/3 font-semibold flex justify-center items-center space-x-2"><FaMinus className='text-red-500 cursor-pointer' onClick={() => { RemoveFromCart( k ) }} /><span>{cart[k].qty}</span><FaPlus className='text-green-500 cursor-pointer' onClick={() => { addItems( k ) }} /></div>
                    </div></li>
                  } )}
                </ul>
                {subTotal<=0? <div></div> : <div className='text-center pb-6'><span className='font-semibold text-md'>Total : </span><span className='font-bold text-lg'>₹{subTotal}</span></div>}
              </div>
              <div className="p-2 w-full my-12">
                <Link href={'/order'}><button className="flex mx-auto text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg">Place Your Order</button></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Checkout