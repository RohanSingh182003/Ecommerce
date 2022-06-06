import React from 'react'
import Link from 'next/link'

const Electronics = () => {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            <Link href={'/product/electronics'}><div className="lg:w-1/4 md:w-1/2 p-4 w-full shadow-xl">
              <a className="block relative h-64 rounded overflow-hidden">
                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src="https://rukminim2.flixcart.com/image/312/312/keaaavk0/computer/x/m/y/lenovo-na-laptop-original-imafuzt8r5jqppfn.jpeg?q=70" />
              </a>
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Electroics</h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">Laptop</h2>
                <p className="mt-1">₹74599</p>
              </div>
            </div></Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Electronics