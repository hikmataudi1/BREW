import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify'
import {useNavigate} from 'react-router-dom'

const PlaceOrder = () => {

  const navigate=useNavigate()
  const { getTotalCartAmount , url, cartItems , product_list } = useContext(StoreContext)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    building: '',
  });
  
  console.log("cart items:"+cartItems);
  
  const deliveryFees = getTotalCartAmount() === 0 ? 0 : getTotalCartAmount()>150?0:5;
  const totalAmount = getTotalCartAmount() + deliveryFees;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!Object.keys(cartItems).length) {
      toast.error("Cart is empty. Add products to proceed.");
      return;
    }

    const products = Object.keys(cartItems)
    .filter((key)=>!key.includes("color"))
    .map((productId, index) => {
      const product = product_list.find((item) => item._id === productId);
      
      const colors = Object.keys(cartItems)
      .filter((key) => key.startsWith(productId) && key.includes("color"))
      .map((key) => cartItems[key]); 

      return {
        product: productId,
        quantity: cartItems[productId],
        name: product?.name, 
        price: product?.price,
        colors,
        key: index, 
      };
    });
    
    const orderData = {
      user: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
      },
      products,
      totalAmount,
      shippingAddress: {
        address: formData.address,
        building: formData.building,
      },
    };

    try {
      console.log("Order Data:", orderData);
      const response = await axios.post(`${url}/api/order/add`, orderData);
      toast.success(response.data.message)

      setTimeout(()=>{
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: '',
          building: '',
        } 
      )
      navigate("/")
      },5000)
      const emailRes = await axios.post(`${url}/api/user/ordermail`, orderData);
      toast.success(emailRes.data.message);
      
    } catch (error) {
      console.error("Error placing order:", error?.response?.data || error.message);
      toast.error(error?.response?.data.message)  
    }
  };

  return (
    <form className="place-order" onSubmit={handleSubmit}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={handleInputChange}
            value={formData.firstName}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={handleInputChange}
            value={formData.lastName}
          />
        </div>
        <input
          type="text"
          name="email"
          placeholder="Email Address"
          onChange={handleInputChange}
          value={formData.email}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          onChange={handleInputChange}
          value={formData.phone}
        />
        <div className="multi-fields">
          <input
            type="text"
            name="address"
            placeholder="Full detailed Address"
            onChange={handleInputChange}
            value={formData.address}
          />
          <input
            type="text"
            name="building"
            placeholder="Building , floor"
            onChange={handleInputChange}
            value={formData.building}
          />
        </div>
        <p className='note'>Please provide all address information (street, floor, etc)</p>
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div className="cart-total-details">
            <p>Product total</p>
            <p>{getTotalCartAmount()}$</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery fees</p>
            <p>{deliveryFees}$</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>{totalAmount}$</b>
          </div>
          <p className='note'>Note: We accept payment by cash on delivery only.  </p>
          <button type="submit">Proceed to Payment</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
