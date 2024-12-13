import React, { useContext, useState, useEffect } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { setCartItems, cartItems, product_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate();
  console.log(cartItems);
  

 
  const initializeDefaultColors = () => {
    const updatedCart = { ...cartItems };
    product_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        
        for (let i = 1; i <= cartItems[item._id]; i++) {
          const colorKey = `${item._id}color${i}`;
          if (!updatedCart[colorKey]) {
            updatedCart[colorKey] = item.images[0]?.color || 'default'; // Set first color or 'default'
          }
        }
      }
    });
    setCartItems(updatedCart);
  };

  useEffect(() => {
    initializeDefaultColors();
  }, [product_list]);

  const handleChangeColor = (id, index, color) => {
    setCartItems((prev) => ({
      ...prev,
      [`${id}color${index}`]: color, 
    }));
  };

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Color</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {product_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            const quantity = cartItems[item._id];
            return (
              <>
                <div className="cart-items-title cart-items-item" key={index}>
                  <img src={url + "/images/" + item.images[0].filename} alt="" />
                  <p>{item.name}</p>
                  <p>{item.price}$</p>
                  <div className="color-container">
                    {[...Array(quantity)].map((_, i) => (
                      <div key={i} className="color-selection">
                        <p>Item {i + 1}: {cartItems[`${item._id}color${i + 1}`]}</p>
                        {[...new Set(item.images.map((img) => img.color))].map((color) => (
                          
                          <button
                            className="color-btn"
                            key={color}
                            onClick={() => handleChangeColor(item._id, i + 1, color)}
                            style={{
                              backgroundColor: color,
                              border: cartItems[`${item._id}color${i + 1}`] === color ? color==="black"?"2px solid white": "2px solid black": "1px solid gray",


                            }}
                          ></button>
                          
                          
                        ))}
                      </div>
                    ))}
                  </div>
                  <p>{quantity}</p>
                  <p>{item.price * quantity}$</p>
                  <p className='cross' onClick={() => removeFromCart(item._id)}>x</p>
                </div>
                <hr />
              </>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Card Total</h2>
          <div className="cart-total-details">
            <p>Product total</p>
            <p>{getTotalCartAmount()}$</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery fees</p>
            <p>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount()>150?0:4}$</p>
            {getTotalCartAmount()>150?<p>Free delivery for orders over 150$!</p>:<></>}
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount()>150?getTotalCartAmount(): getTotalCartAmount() + 4}$</b>
          </div>
          <button onClick={() => navigate('/order')}>Proceed to checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
