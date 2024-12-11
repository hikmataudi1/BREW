import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'
const List = ({url}) => {
  const [list,setList]=useState([])

  const fetchList = async ()=>{
    const response = await axios.get(`${url}/api/product/list`)
    
    if(response.data.success){
      setList(response.data.data)
    } 
    else{
      toast.error("Error occurred")
    }
  }
  
  const removeProduct =async(id)=>{ 
   const response = await axios.post(`${url}/api/product/remove`,{id:id})
   await fetchList()
   if(response.data.success){
    toast.success(response.data.message)
   }
   else{
    toast.error("Error occurred ")
   }
  }

  const toggleStockStatus = async (productId,currentStatus)=>{
    try{
      const updatedProduct = await axios.put(`${url}/api/product/${productId}/stock`,{inStock:!currentStatus})
      if(updatedProduct.data.success) {
        toast.success("Status updated successfully")
      }
      await fetchList()
    } catch(err){
      console.error('Failed to update stock status',err);
      toast.error("Failed to update the stock status ")
    }
  }

  useEffect(()=>{
    fetchList()
  },[])
  
  return (
    <div className='list add flex-col'>
      <p>All Products List</p>
      <div className="list-table">
        <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Type</b>
            <b>Price</b>
            <b>Status</b>
            <b>Remove</b>
        </div>
        {list.map((item,index)=>{
            return(
              <div key={index} className='list-table-format'>
                <img src={`${url}/images/`+item.images[0].filename} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>{item.type}</p>
                <p>{item.price}$</p>
                <p>
                  In Stock:
                  <input 
                  type="checkbox"
                  checked={item.inStock}
                  onChange={()=>toggleStockStatus(item._id,item.inStock)} />
                </p>
                <p onClick={()=>removeProduct(item._id)} className='cursor'>X</p>
              </div>
            )
        })}
      </div>
    </div>
  )
}

export default List