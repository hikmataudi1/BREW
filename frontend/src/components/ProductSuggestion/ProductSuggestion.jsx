import React, { useContext, useState } from 'react';
import './ProductSuggestion.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import ProductSlider from '../ProductSlider/ProductSlider';

const Productsuggestion = ({ id, name, price, description, images, type }) => {
  const { url } = useContext(StoreContext);
  const [selectedColor, setSelectedColor] = useState(images[0]?.color || "");
  const filteredImages = images.filter((img) => img.color === selectedColor);

  return (
    <div className="product-sugg">
      <div className="product-sugg-img-container">
        <ProductSlider images={filteredImages.map((img) => img.filename)} url={url} />
      </div>
      <div className="product-sugg-content">
        <div className="product-sugg-info">
          <h2 className="product-sugg-name">{name}</h2>
          <div className="color-container">
            {[...new Set(images.map((img) => img.color))].map((color) => (
              <button
                className="color-btn"
                key={color}
                onClick={() => setSelectedColor(color)}
                style={{
                  backgroundColor: color,
                  border: selectedColor === color ? "2px solid black" : "1px solid #ccc",
                }}
              ></button>
            ))}
          </div>
          
        </div>
        <div className="product-sugg-colors">
        <p className="product-sugg-description">{description}</p>
        </div>
        <div className="product-sugg-price-container">
            <p className="product-sugg-price-discount">${Math.floor(price * 1.35)}</p>
            <p className="product-sugg-price">${price}</p>
            <img src={assets.discount_icon} alt="discount"  className='discount-icon'/>
            <span className="discount-badge">Launch Discount!</span>
        </div>
      </div>
    </div>
  );
};

export default Productsuggestion;
