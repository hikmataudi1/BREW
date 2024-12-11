import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className='footer-content'>
            <div className="footer-content-left">
                <img src={assets.logo2} alt="" className='logo'/>
                <p>Thank you for choosing BREW , the best coffee equipment in town</p>
                <div className="footer-social-icons">
                    <a href="https://wa.me/+96171498677"><img src={assets.instagram_icon}/></a>
                    <img src={assets.whatsapp_icon} alt="" />
                    <p>@perfect_brewcoffeestore</p>
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/aboutus">About us</Link></li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>Get in touch</h2>
                <ul>
                    <a href="https://wa.me/+96171498677"><li>00 961 71 498 677</li></a>
                    <li>brewperfect3@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className='footer-copyright'>Copyright 2024 © PERFECT BREW - All Rights Reserved</p>
    </div>
  )
}

export default Footer