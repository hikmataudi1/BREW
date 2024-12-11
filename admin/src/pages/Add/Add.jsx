import React, { useEffect, useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'
const Add = ({url}) => {

    const [images,setImages]=useState([])
    const [data,setData]=useState({
        name:"",
        description:"",
        price:"",
        category:"V60",
        type:"Classic"
    })

    const onChangeHandler=(e)=>{
        const name = e.target.name
        const value=e.target.value
        setData(data=>({...data,[name]:value}))
    }

    
    const onImageChange=(e)=>{
        const files = Array.from(e.target.files)
        if (files.length > 0) {
            const newImages = files.map((file)=>({file,color:""}))
            setImages(prevImages => [...prevImages, ...newImages]);
          }
    }

    const handleColorChange = (index,color)=>{
        setImages((prevImages)=>
            prevImages.map((img,i)=>(i===index ? {...img , color}: img))
        )
    }

    const onSubmitHandler=async(e)=>{
        e.preventDefault()

        if (images.length === 0) {
            toast.error('Please upload at least one image.');
            return;
          }

          if (images.some(image => !image.color)) {
            toast.error('Please assign a color to all uploaded images.');
            return;
        }
        
        const formData = new FormData()
        formData.append("name",data.name)
        formData.append("description",data.description)
        formData.append("price",Number(data.price))
        formData.append("category",data.category)
        formData.append("type",data.type)

        images.forEach((image)=>{
            formData.append('images', image.file);
            formData.append('colors',image.color)
          })
        
        const response = await axios.post(`${url}/api/product/add`,formData)
        if(response.data.success){
            setData({
                name:"",
                description:"",
                price:"",
                category:"V60",
                type:"Classic"
            })
            setImages([])
            toast.success(response.data.message)
            console.log([...formData.entries()])
        }
        else{
            toast.error(response.data.message)
        }
    }
  return (
    <div className='add'>
        <form className='flex-col' onSubmit={onSubmitHandler}>
            <div className="add-image-upload flex-col">
                <p>Upload images</p>
                <label htmlFor="image">
                {images.length > 0 ? (
                            <div className="image-previews">
                                {images.map((image, index) => (
                                    <div key={index} className="image-preview">
                                        <img
                                            src={URL.createObjectURL(image.file)} 
                                            alt={`Preview ${index}`}
                                            className="preview-img"
                                        />
                                        <input 
                                            type="text"
                                            placeholder='Enter color'
                                            value={image.color}
                                            onChange={(e)=>handleColorChange(index,e.target.value)}
                                            className='color-input'
                                        />
                                        <button 
                                            type="button"
                                            className="remove-img-btn"
                                            onClick={() => {
                                                setImages(prevImages => prevImages.filter((_, i) => i !== index));
                                            }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <img src={assets.upload_area} alt="Upload area" className="upload-placeholder" />
            )}              
            </label>
            <input
            onChange={onImageChange}
            type="file"
            id="image"
            hidden
            multiple
            required
          />            
          </div>
            <div className="add-product-name flex-col">
                <p>Product name</p>
                <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='type here' required />
            </div>
            <div className="add-product-description flex-col">
                <p>Product description</p>
                <textarea name="description" onChange={onChangeHandler} rows='6' placeholder='Write content here' required></textarea>
            </div>
            <div className="add-category-price">
                <div className='add-category flex-col'>
                    <p>Product category</p>
                    <select onChange={onChangeHandler} name="category" >
                        <option value="V60">V60</option>
                        <option value="Moka Pot">Moka Pot</option>
                        <option value="Chemex">Chemex</option>
                        <option value="French Press">French Press</option>
                        <option value="Syphon">Syphon</option>
                        <option value="Sets">Sets</option>
                        <option value="Accessories">Accessories</option>
                    </select>
                </div>
                <div className="type flex-col">
                    <p>Product Type</p>
                    <select onChange={onChangeHandler} name="type" >
                        <option value="Classic">Classic</option>
                        <option value="Premium">Premium</option>
                    </select>
                </div>
                </div>
                <div className='add-price flex-col'>
                    <p>Product Price</p>
                    <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='50$' required min="1"/>
                </div>
                <button type='submit' className='add-button'>Add Item</button>
            
        </form>
    </div>
  )
}

export default Add