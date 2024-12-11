import React, { useState } from 'react'
import Navbar from './components/navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/footer/Footer'
import Products from './pages/Products/Products'
import AboutUs from './pages/AboutUs/AboutUs'
import Loginpopup from './components/loginpopup/Loginpopup'
import Test from './pages/Test/Test'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const url = 'http://localhost:4000'
  const [showLogin , setShowLogin] =useState(false)
  const [showLoginButton ,setShowLoginButton]=useState(true)
  const [loggedin,setLoggedin]=useState(false)

  return ( 
    <>
      {showLogin?<Loginpopup setShowLogin={setShowLogin} setLoggedin={setLoggedin} setShowLoginButton={setShowLoginButton} url={url}/>:<></>}
      <div className='app'>
        <ToastContainer/>
        <Navbar setShowLogin={setShowLogin} showLoginButton={showLoginButton} loggedin={loggedin}/>
        <Routes>
          <Route path='/' element={<Home setShowLogin={setShowLogin}/>}/>
          <Route path='/cart' element={<Cart/>} />
          <Route path='/order' element={<PlaceOrder/>}/>
          <Route path='/products' element={<Products/>}/>
          <Route path='/test' element={<Test/>}/>
          <Route path='/aboutus' element={<AboutUs/>}/>
        </Routes>
      </div>
      <Footer/>
    </>
  )
}

export default App