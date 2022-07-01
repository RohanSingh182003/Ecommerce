import React from 'react'
import Link from 'next/link';
import { FaPlus, FaMinus } from 'react-icons/fa'
import Head from 'next/head'
import Script from 'next/script'

const Checkout = ( { subTotal, RemoveFromCart, cart, addItems } ) => {
  const initiatePayment = async () => {
    let oid =Math.floor(Math.random()*Date.now());
    // get a transaction token  
    const data = {cart , subTotal , oid ,email : 'email@sample.fake'}
    let a = await fetch( `${process.env.NEXT_PUBLIC_HOST}/api/pretransection`, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(data),
    } )
    let txnRes = await a.json()
    console.log(txnRes)
    let txnToken = txnRes.txnToken
    let config = {
      "root": "",
      "flow": "DEFAULT",
      "data": {
        "orderId": oid, /* update order id */
        "token": txnToken, /* update token value */
        "tokenType": "TXN_TOKEN",
        "amount": subTotal /* update amount */
      },
      "handler": {
        "notifyMerchant": function ( eventName, data ) {
          console.log( "notifyMerchant handler function called" );
          console.log( "eventName => ", eventName );
          console.log( "data => ", data );
        }
      }
    };

    window.Paytm.CheckoutJS.init( config ).then( function onSuccess() {
      // after successfully updating configuration, invoke JS Checkout
      window.Paytm.CheckoutJS.invoke();
    } ).catch( function onError( error ) {
      console.log( "error => ", error );
    } );
  }
  return (
    <>
      {/* adding payment settings */}
      <Head><meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" /></Head>
      <Script type="application/javascript" crossorigin="anonymous" src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`} />
      {/* source code of checkout.js page */}
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-12 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Checkout Now</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Your order Id and other details will give you soon.</p>
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
                {subTotal <= 0 ? <div></div> : <div className='text-center pb-6'><span className='font-semibold text-md'>Total : </span><span className='font-bold text-lg'>₹{subTotal}</span></div>}
              </div>
              <div className="p-2 w-full my-12">
                <Link href={'/order'}><button className="flex mx-auto text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg" onClick={initiatePayment} >Place Your Order</button></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Checkout