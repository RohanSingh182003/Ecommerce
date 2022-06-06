import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import '../styles/globals.css'

// https://source.unsplash.com/random/1400x400/?ecommerce

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Navbar/>
    <Component {...pageProps} />
    <Footer/>
    </>)
}

export default MyApp
