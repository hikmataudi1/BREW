import React, { useContext, useState } from 'react'
import './navbar.css'
import { assets } from '../../assets/assets'
import {Link} from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({setShowLogin,showLoginButton,loggedin}) => {
const {getTotalCartAmount} = useContext(StoreContext)

  const [menu,setMenu] =useState('Home')

 

  return (
    <div className='navbar'>
       <Link to="/"><img src={assets.logo} alt="" className="logo" /></Link>
       <ul className='navbar-menu'>
        <Link onClick={()=>setMenu("Home")} className={menu==='Home' ? "active" : ""} to="/">Home</Link>
        <Link onClick={()=>setMenu("Products")} className={menu==='Products' ? "active" : ""} to="/products" >Products</Link>
        <Link onClick={()=>setMenu("About us")} className={menu==='About us' ? "active" : ""} to="/aboutus">About us</Link>
        <Link onClick={()=>setMenu("Coffee test")} className={menu==='Coffee test' ? "active" : ""} to="/test">Brew Test</Link>
       </ul>
       
       <div className="navbar-right">
        <Link to="/products"><img src={assets.search_icon} className='search-icon' /></Link>
        {showLoginButton?
          <img onClick={()=>setShowLogin(true)} src={assets.ebooklogo} className='profile-icon'></img>
          : <></>
        }
        
        <div className="navbar-search-icon">
        <Link to="/cart"><img src={assets.basket_icon} id='basket-icon'/></Link>

          <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
        {showLoginButton?
        <button onClick={()=>setShowLogin(true)}>Get e-book</button>:
        <></>
        }
        {
          loggedin?
          <button>Already signed in</button>: 
          <></> 
        }
       </div>
    </div>
  )
}

export default Navbar
