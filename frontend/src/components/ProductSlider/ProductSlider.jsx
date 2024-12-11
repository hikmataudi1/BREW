import React from 'react'
import './ProductSlider.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';


const ProductSlider = ({images,url}) => {
    return (
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
        >
           {images.map((image, index) => (
        <SwiperSlide key={index}>
          <img src={`${url}/images/${image}`} alt="Product" className='product-slider-image' />
        </SwiperSlide>
      ))}
        </Swiper>
      );
}
export default ProductSlider