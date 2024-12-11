import React, { useState, useEffect } from 'react';
import './Order.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [productDetails, setProductDetails] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch all orders
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/get`);
      if (response.data.success) {
        setOrders(response.data.data);
        
      } else {
        toast.error('Error listing orders');
      }
    } catch (error) {
      toast.error('Failed to fetch orders');
    }
  };

  // Fetch product details for all unique product IDs
  const fetchProductDetails = async () => {
    try {
      const productIds = new Set();
      orders.forEach(order =>
        order.products.forEach(productObj => productIds.add(productObj.product))
      );
      console.log(productIds);
      const ids=Array.from(productIds)
      console.log(ids);
      const query = ids.join(',')
      const response = await axios.get(`${url}/api/product/get?ids=${query}`);
      
      if (response.data.success) {
        const details = {};
        response.data.data.forEach(product => {
          details[product._id] = product;
        });
        setProductDetails(details);
      } else {
        toast.error('Failed to fetch product details');
      }
    } catch (error) {
      toast.error('Error fetching product details');
    }
  };

  // Update order status
  const statusHandler = async (e, id) => {
    try {
      const response = await axios.put(`${url}/api/order/update`, {
        id,
        status: e.target.value,
      });
      if (response.data.success) {
        await fetchAllOrders();
      } else {
        toast.error('Failed to update status');
      }
    } catch (error) {
      toast.error('Error updating order status');
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await fetchAllOrders();
      setLoading(false);
    })();
  }, []);
  
  useEffect(() => {
    if (orders.length > 0) {
      fetchProductDetails(orders);
    }
  }, [orders]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const getPendingOrders=()=>{
    const pendOrders= orders.filter((order)=>order.status==="Pending")
    return pendOrders.length
  }
  const pending = getPendingOrders()
  return (
    <div className='order add'>
      <h2>Orders Page</h2>
      <h3>Theres {pending} orders pending </h3>
      <div className="order-list">
        {orders.map((order) => (
          <div className='order-item' key={order._id}>
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-product">
                {order.products.map((productObj, index) => {
                  const product = productDetails[productObj.product];
                  if (!product) return null;
                  return (
                    <span key={productObj.product}>
                      {product.name} x {productObj.quantity}
                      {index < order.products.length - 1 && ', '}
                    </span>
                  );
                })}
              </p>
              <p className='order-item-name'>{order.user.name}</p>
              <div className='order-item-address'>
                <p>{`Address : ${order.shippingAddress.address} ,`}</p>
                <p>{`Building : ${order.shippingAddress.building} `}</p>
                <p>{`Total amount : ${order.totalAmount}$ `}</p>
                <p>{`Date ordered : ${order.createdAt}`}</p>
                <select onChange={(e) => statusHandler(e, order._id)} value={order.status}>
                  <option value="" disabled>Update status</option>
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <p className='order-item-phone'>{`Phone number: ${order.user.phone}`}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
