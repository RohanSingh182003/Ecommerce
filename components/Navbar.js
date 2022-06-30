import React, { useState } from 'react'
import Link from 'next/link'
import { useRef } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { RiAccountCircleFill } from 'react-icons/ri';
import { GrClose } from 'react-icons/gr';
import { FaPlus, FaMinus } from 'react-icons/fa';

// Empty Space Code = &nbsp;

const Navbar = ( { clearCart, subTotal, RemoveFromCart, cart, addItems, user , logout } ) => {
  const ref = useRef()
  const toggleSidebar = () => {
    if ( ref.current.classList.contains( 'translate-x-full' ) ) {
      ref.current.classList.remove( 'translate-x-full' )
      ref.current.classList.add( 'translate-x-0' )
    }
    else if ( ref.current.classList.contains( 'translate-x-0' ) ) {
      ref.current.classList.remove( 'translate-x-0' )
      ref.current.classList.add( 'translate-x-full' )
    }
  }
  const [dropdown, setDropdown] = useState(false)
  return (
    <div className='sticky top-0 bg-gray-50 z-10'>
      <header className="text-gray-600 body-font bg-gray-50">
        <div className="container mx-auto flex flex-wrap p-4 flex-col md:flex-row items-center">
          <Link href={'/'}><a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-pink-500 rounded-full" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl">Ecommerce</span>
          </a></Link>
          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
            <Link href={'/fashion'}><a className="mr-5 hover:text-pink-700">Fashion</a></Link>
            <Link href={'/electronics'}><a className="mr-5 hover:text-pink-700">Electronics</a></Link>
            <Link href={'/homeappliances'}><a className="mr-5 hover:text-pink-700">Home Appliances</a></Link>
            <Link href={'/grocery'}><a className="mr-5 hover:text-pink-700">Grocery</a></Link>
          </nav>
          <div className="absolute top-0 right-0 md:top-6 md:right-6 cursor-pointer">
            <div className='flex md:space-x-2'>
              {user.value && <RiAccountCircleFill className='text-3xl text-pink-500 mt-2 md:mt-0 md:m-2' onMouseOver={()=>{setDropdown(true)}} onMouseLeave={()=>{setDropdown(false)}}/>}
            {dropdown && <div className='bg-gray-100 absolute top-0 right-0 md:top-5 md:right-14 p-4 rounded-md cursor-pointer w-36' onMouseOver={()=>{setDropdown(true)}} onMouseLeave={()=>{setDropdown(false)}}>
                <ul className='space-y-2'>
                  <Link href={'/myaccount'}><a><li className='hover:text-pink-700'>My Account</li></a></Link>
                  <Link href={'/myorders'}><a><li className='hover:text-pink-700 my-2'>Orders</li></a></Link>
                  <li className='hover:text-pink-700' onClick={logout}>LogOut</li>
                </ul>
              </div>}
              {!user.value && <Link href={'/login'}><a><button className='text-pink-600 hover:text-pink-800 mt-2 md:mt-0 rounded-lg'>Login</button></a></Link>}
              <a><AiOutlineShoppingCart className='text-3xl text-pink-500 m-2 md:m-0' onClick={toggleSidebar} /></a>
            </div>
          </div>
          {/* Slider starts here */}
          <div ref={ref} className="absolute top-0 right-0 bg-gray-100 px-10 pt-2 h-[100vh] transform translate-x-full transition-transform overflow-y-scroll">
            <span className='absolute right-6 top-4 md:top-6 cursor-pointer' onClick={toggleSidebar}><GrClose /></span>
            <ul className='mt-14 list-decimal'>
              <div className="flex">
                <h3 className='w-2/3 font-extrabold text-pink-500 text-center'>Products</h3>
                <h3 className='w-1/3 font-extrabold text-pink-500 text-center'>Quantity</h3>
              </div>
              {/* items */}
              {Object.keys( cart ).length <= 0 && <div className='my-5 text-center font-bold text-red-500'>Your cart is Empty!</div>}
              {Object.keys( cart ).map( ( k ) => {
                return <li key={k}><div className="flex my-6">
                  <div className="w-2/3 font-semibold flex justify-center items-center my-6">{cart[k].prodName}({cart[k].size}/{cart[k].varient})</div><div className="w-1/3 font-semibold flex justify-center items-center space-x-2"><FaMinus className='text-red-500 cursor-pointer' onClick={() => { RemoveFromCart( k ) }} /><span>{cart[k].qty}</span><FaPlus className='text-green-500 cursor-pointer' onClick={() => { addItems( k ) }} /></div>
                </div>
                </li>
              } )}
              <div className='text-center pb-3'><span className='font-semibold text-md'>Total : </span><span className='font-bold text-lg'>₹{subTotal}</span></div>
            </ul>
            <div className="flex mb-4 md:mb-8">
              <Link href={'/checkout'}><button className="flex mt-8 mx-3 items-center text-white bg-pink-500 border-0 p-2 focus:outline-none hover:bg-pink-600 rounded text-sm w-1/2">Checkout</button></Link>
              <button className="flex mt-8 mx-3 items-center text-white bg-pink-500 border-0 focus:outline-none hover:bg-pink-600 rounded text-sm p-2 w-1/2" onClick={() => { clearCart() }}>Clear&nbsp;Cart</button>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Navbar