import React, { useState } from 'react'
import './ExploreMenu.css'
import {menu_list} from '../../assets/assets'
const ExploreMenu = ({category,setCategory,type,setType}) => {
  
 

    return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore our unique collection</h1>
        <p className='explore-menu-text'>Choose wisely, make every cup of coffee different.</p>
        
        <h3 className="explore-menu-filter-text">Shop by type:</h3>
        <div className='explore-menu-type-container'>
            <div className={type==="Classic"?"classic-filter-active":'classic-filter'} onClick={()=>{setType(prev=>prev==="Classic"?"All":"Classic")}}>
                <h3 className="classic-filter-text">Classic</h3>   
                <p className='classic-filter-quote'>Traditional Charm</p>
            </div>
            <div className={type==="Premium"?"premium-filter-active":'premium-filter'} onClick={()=>{setType(prev=>prev==="Premium"?"All":"Premium")}}>
                <h3 className="premium-filter-text">Premium</h3>
                <p className='premium-filter-quote'>Unparalleled Elegance</p>
            </div>
        </div>

        <h3 className="explore-menu-filter-text">Shop by category: </h3>
        <div className='explore-menu-list'>
            {menu_list.map((item,index)=>{
                return (
                    <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} className='explore-menu-list-item' key={index} >
                        <img className={category===item.menu_name?"active":""} src={item.menu_image} alt=''/>
                        <p>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
        <hr/>
    </div>
  )
}

export default ExploreMenu