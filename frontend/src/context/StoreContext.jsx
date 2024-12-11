import { createContext, useEffect, useState } from "react"; 
import { url } from "../../../admin/src/assets/assets";
import axios from 'axios'

export const StoreContext = createContext(null)

const StoreContextProvider = (props)=>{
    const url ="http://localhost:4000"
    const [cartItems,setCartItems]=useState({})
    const [product_list,setProductList]=useState([])
    const addToCart = (itemId)=>{
        if(!cartItems[itemId]) {
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else {
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
    }

    const removeFromCart = (itemId)=>{
            setCartItems((prev)=>{
                const updatedCart = {...prev}
                if (updatedCart[itemId]>1){
                    updatedCart[itemId]-=1
                } else {
                    delete updatedCart[itemId]
                }
                return updatedCart
            })
    }

    const getTotalCartAmount=()=>{
        let totalAmount = 0
        for(const item in cartItems){
            if(cartItems[item]>0) {
            let itemInfo = product_list.find((product)=>product._id === item)
            totalAmount += itemInfo.price * cartItems[item]
            }
            
        } 

        return totalAmount
    }

    const handleColorSelect=()=>{

    }

    const fetchProductList = async ()=>{
        const response=await axios.get(url+"/api/product/list")
        setProductList(response.data.data)
    }

    useEffect(()=>{
        async function loadData() {
            await fetchProductList()
        }
        loadData()
    },[])

    const contextValue = {
        product_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider