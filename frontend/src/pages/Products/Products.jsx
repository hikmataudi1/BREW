import React from 'react'
import { useState } from 'react'
import './Products.css'
import ExploreMenu from '../../components/exploreMenu/ExploreMenu'
import ProductDisplay from '../../components/productDisplay/ProductDisplay'

const Products = () => {

  const [category,setCategory]=useState("All")
  const [type,setType]=useState("All")

  return (
    <div>
      <ExploreMenu category={category} setCategory={setCategory} type={type} setType={setType}/>
      <ProductDisplay category={category} type={type}/>
    </div>
  )
}

export default Products