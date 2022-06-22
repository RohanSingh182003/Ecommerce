import React from 'react'
import Link from 'next/link'
import mongoose from "mongoose";
import Product from "../models/Product"

const HomeAppliances = ({products}) => {
  return (
    <div>
<section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap -m-4">
{products.map((item)=>{    
return <Link href={'/product/homeappliances'} key={item._id}><div className="lg:w-1/4 md:w-1/2 p-4 w-full shadow-xl">
        <div className="block relative h-64 rounded overflow-hidden">
          <img alt="ecommerce" className="object-cover object-center w-full h-full block" src="https://rukminim2.flixcart.com/image/612/612/l26hdow0/bed/a/v/a/-original-imagdhfzzgphpzmx.jpeg?q=70"/>
        </div>
        <div className="mt-4">
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{item.catagory}</h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">{item.title}</h2>
          <p className="mt-1">₹{item.price}</p>
        </div>
      </div></Link>})}
    </div>
  </div>
</section>
    </div>
  )
}

export async function getServerSideProps(context) {
  if(!mongoose.connections[0].readyState){
    mongoose.connect(process.env.MONGO_URI)
}
let products = await Product.find({catagory:'homeappliances'})
  return {
    props: {products:JSON.parse(JSON.stringify(products))}
  }
}

export default HomeAppliances