import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import '../styles/globals.css'
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import NextNProgress from "nextjs-progressbar";

// https://source.unsplash.com/random/1400x400/?ecommerce

function MyApp( { Component, pageProps } ) {
  const router = useRouter()
  const [item, setItem] = useState( {} )
  const [subTotal, setSubTotal] = useState( 0 )
  const [user, setUser] = useState( { value: null } )
  const [key, setKey] = useState( 0 )
  let newItem = item;
  useEffect( () => {
    try {
      if ( localStorage.getItem( 'item' ) ) {
        setItem( JSON.parse( localStorage.getItem( 'item' ) ) )
        saveCart( JSON.parse( localStorage.getItem( 'item' ) ) )
      }
    } catch ( error ) {
      console.error( error );
      localStorage.clear()
    }
    let token = localStorage.getItem( 'token' )
    if ( token ) {
      setUser( { value: token } )
      setKey( Math.random() )
    }
  }, [router.query] )

  const saveCart = ( myCart ) => {
    localStorage.setItem( "item", JSON.stringify( myCart ) )
    let subt = 0;
    let keys = Object.keys( myCart )
    for ( let i = 0; i < keys.length; i++ ) {
      subt = myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setSubTotal( subt )
  }
  const addToCart = ( id, qty, prodName, price, size, varient ) => {
    if ( id in item ) {
      newItem[id].qty += 1;
    }
    else {
      newItem[id] = { qty, price, prodName, size, varient }
    }
    setItem( newItem )
    saveCart( newItem )
  }

  const buyNow = ( id, qty, prodName, price, size, varient ) => {
    setItem( {} )
    saveCart( {} )
    newItem[id] = { qty, price, prodName, size, varient }
    setItem( newItem )
    saveCart( newItem )
    router.push( '/checkout' )
  }

  const clearCart = () => {
    setItem( {} )
    saveCart( {} )
  }

  const RemoveFromCart = ( id ) => {
    if ( newItem[id].qty < 0 ) {
      delete newItem[id]
    }
    else {
      newItem[id].qty -= 1;
      setItem( newItem )
      saveCart( newItem )
    }
  }

  const addItems = ( id ) => {
    newItem[id].qty += 1;
    setItem( newItem )
    saveCart( newItem )
  }
  const logout = () => {
    localStorage.removeItem( 'token' )
    setKey( Math.random() )
    setUser( { value: null } )
    router.push('/')
  }
  return (
    <>
      <NextNProgress
        color="#ec4899"
        startPosition={0.3}
        stopDelayMs={200}
        height={2}
        showOnShallow={true}
      />
      <Navbar cart={item} addToCart={addToCart} RemoveFromCart={RemoveFromCart} clearCart={clearCart} subTotal={subTotal} addItems={addItems} key={key} user={user} logout={logout} />
      <Component cart={item} addToCart={addToCart} RemoveFromCart={RemoveFromCart} clearCart={clearCart} subTotal={subTotal} {...pageProps} addItems={addItems} buyNow={buyNow} />
      <Footer />
    </> )
}

export default MyApp
