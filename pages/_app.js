import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import '../styles/globals.css'
import { useState , useEffect } from "react";

// https://source.unsplash.com/random/1400x400/?ecommerce

function MyApp({ Component, pageProps }) {
  const [item, setItem] = useState({})
  const [subTotal, setSubTotal] = useState(0)
  let newItem = item;
  useEffect(() => {
    try {      
      if (localStorage.getItem('item')) {
        setItem(JSON.parse(localStorage.getItem('item')))
      }
    } catch (error) {
      console.error(error);
      localStorage.clear()
    }
  }, [])
  
  const saveCart = (myCart) => {
    localStorage.setItem("item" , JSON.stringify(myCart))
    let subt =0;
    let keys = Object.keys(myCart)
    for (let i = 0; i < keys.length; i++) {
      subt = myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setSubTotal(subt)
  }
  const addToCart = (id,qty,prodName,price,size,varient) => {
    if(id in item){
      newItem[id].qty += 1;
    }
    else{
      newItem[id] = {qty ,price ,prodName,size,varient}
    }
    setItem(newItem)
    saveCart(newItem)
  }

  const clearCart = () => {
    setItem({})
    saveCart({})
  }

  const RemoveFromCart = (id) => {
      if(newItem[id].qty<=0){
        delete newItem[id];
      }
      else{
        newItem[id].qty -= 1;
      }
    setItem(newItem)
    saveCart(newItem)
  }

  const addItems =(id) => {
    newItem[id].qty += 1;
  }
  return (
    <>
    <Navbar cart={item} addToCart={addToCart} RemoveFromCart={RemoveFromCart} clearCart={clearCart} subTotal={subTotal} addItems={addItems} />
    <Component cart={item} addToCart={addToCart} RemoveFromCart={RemoveFromCart} clearCart={clearCart} subTotal={subTotal} {...pageProps} addItems={addItems} />
    <Footer/>
    </>)
}

export default MyApp
