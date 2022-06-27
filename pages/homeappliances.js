import React from 'react'
import Link from 'next/link'
import mongoose from "mongoose";
import Product from "../models/Product"

const HomeAppliances = ( { products } ) => {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
            {Object.keys( products ).length == 0 && <p>Sorry! electronics section Of our stock is empty.New stock coming soon, Stay Tuned..</p>}
            {Object.keys( products ).map( ( item ) => {
              return <Link href={`/product/${products[item].slug}`} key={products[item]._id}><div className="lg:w-1/4 md:w-1/2 p-4 w-full shadow-xl">
                <div className="block relative h-64 rounded overflow-hidden">
                  <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={products[item].img} />
                </div>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{products[item].catagory}</h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].title}</h2>
                  <p className="mt-1">₹{products[item].price}</p>
                  <div className='space-x-2 mt-2'>
                    {products[item].size.includes( 'M' ) && <span className='border border-gray-300 p-1'>M</span>}
                    {products[item].size.includes( 'L' ) && <span className='border border-gray-300 p-1'>L</span>}
                    {products[item].size.includes( 'XL' ) && <span className='border border-gray-300 p-1'>XL</span>}
                  </div>
                  <div className='space-x-2 mt-2'>
                    {products[item].color.includes( 'red' ) && <button className=" bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes( 'blue' ) && <button className=" bg-blue-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes( 'yellow' ) && <button className=" bg-yellow-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                  </div>
                </div>
              </div></Link>
            } )}
          </div>
        </div>
      </section>
    </div>
  )
}

export async function getServerSideProps( context ) {
  if ( !mongoose.connections[0].readyState ) {
    mongoose.connect( process.env.MONGO_URI )
  }
  let products = await Product.find( { catagory: 'homeappliances' } )
  let homeappliances = {}
  for ( let item of products ) {
    if ( item.title in homeappliances ) {
      if ( !homeappliances[item.title].color.includes( item.color ) && item.availableQty > 0 ) {
        homeappliances[item.title].color.push( item.color )
      }
      if ( !homeappliances[item.title].size.includes( item.size ) && item.availableQty > 0 ) {
        homeappliances[item.title].size.push( item.size )
      }
    }
    else {
      homeappliances[item.title] = JSON.parse( JSON.stringify( item ) )
      if ( item.availableQty > 0 ) {
        homeappliances[item.title].color = [item.color]
        homeappliances[item.title].size = [item.size]
      }
    }
  }
  return {
    props: { products: JSON.parse( JSON.stringify( homeappliances ) ) }
  }
}

export default HomeAppliances