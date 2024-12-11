import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/header/Header'
import Block from '../../components/Block/Block'
import Rtl from '../../components/Slider/Rtl'


const Home = ({setShowLogin}) => {

  return (
    <div>
        <Header/>
        <Rtl/>
        <Block 
        header="Get your free e-book" 
        content="Get a full free coffee guide, by signing in , containg all you need to brew the perfect cup of coffee" 
        btn_text="Get it for free" 
        img="bg4.jpg"
        id="ebook"
        button_to=""
        onClick={()=>{setShowLogin(true)
        }}
        />
        <Block 
        header="Discover our story" 
        content="Helping coffee lovers enhance their daily routines." 
        btn_text="About us" 
        img="bg6.jpg"
        id='story'
        button_to='aboutus'
        onClick={()=>{}}
        />
        <Block 
        header="Find your perfect match" 
        content="Not sure which equipment suits you? Take our quiz and find your perfect match!" 
        btn_text="Take Quiz" 
        img="bg3.jpg"
        button_to='test'
        id="test"
        onClick={()=>{}}
        />
        
        
    </div>
  )
}

export default Home