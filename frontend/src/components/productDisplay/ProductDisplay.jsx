import React, { useContext } from 'react'
import "./ProductDisplay.css"
import { StoreContext } from '../../context/StoreContext'
import ProductItem from '../ProductItem/ProductItem'
const ProductDisplay = ({category,type}) => {
  
  const {product_list} = useContext(StoreContext)
  
    return (
    <div className='product-display' id='product-display'>
        <h2>Premium equipment for you</h2>
        <div className="product-display-list">
            {product_list.map((item,index)=>{
              if((category==="All" && type==="All") ||
                 (category==="All" && type===item.type) ||
                 (type==="All" && category===item.category) ||
                 (category===item.category && type===item.type)){
                return <ProductItem 
                key={index} 
                id={item._id} 
                name={item.name} 
                description={item.description} 
                price={item.price} 
                images={item.images} 
                type={item.type} 
                inStock={item.inStock}
                />
              }
                
            })}
        </div>
    </div>
  )
}

export default ProductDisplay