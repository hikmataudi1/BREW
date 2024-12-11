import React, { useContext, useState } from "react";
import "./ProductItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import ProductSlider from "../ProductSlider/ProductSlider";

const ProductItem = ({ id, name, price, description, images, type ,inStock}) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
  const [selectedColor, setSelectedColor] = useState(images[0]?.color || "");
  const filteredImages = images.filter((img) => img.color === selectedColor);

  return (
    <div className="product-item">
      <div className="product-item-img-container">
        <ProductSlider images={filteredImages.map((img) => img.filename)} url={url} />
        
        {!inStock?
        <p className="out-of-stock">Out of stock</p>:
        !cartItems[id] ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt="Add to cart"
          />
        ) : (
          <div className="product-item-counter">
            <img
              className="add-icon"
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt="Remove item"
            />
            <p>{cartItems[id]}</p>
            <img
              className="add-icon"
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt="Add item"
            />
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="product-item-info">
        <div className="product-item-name-rating">
          <p>{name}</p>
          <div className="color-container">
            {[...new Set(images.map((img) => img.color))].map((color) => (
              <button
                className="color-btn"
                key={color}
                onClick={() => setSelectedColor(color)}
                style={{
                  backgroundColor: color,
                  border: selectedColor === color ? "2px solid black" : "1px solid gray",
                }}
              ></button>
            ))}
          </div>
        </div>

        <p className="product-item-description">{description}</p>
        
        <div className="price-container">
            <div className="price-text">
            <p className="product-item-price product-item-price-discount">
              ${Math.floor(price * 1.35)}
            </p>
            <p className="product-item-price">${price}</p>
            </div>
            <img src={assets.discount_icon} alt="Discount icon" />
            <h4  className="discount-tag">Launch Discount!</h4>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
