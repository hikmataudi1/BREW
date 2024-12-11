import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <div className='header' id='header'>
        <div className="header-content">
            <h2>Order your next Coffee magic instrument</h2>
            <p>Choose from a diverse collection of coffee premium equipements to change your daily life</p>
            <Link to="/products"><button>Explore collection</button></Link>
        </div>
    </div>
  )
}

export default Header