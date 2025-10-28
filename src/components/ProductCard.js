import React from 'react';
import './ProductCard.css';
import pspImage from '../assets/psp.jpg';

function ProductCard() {
  return (
    <div className="product-card">
      <img src={pspImage} alt="PSP 3004" className="product-image" />
      <div className="product-info">
        <h2 className="product-name">PSP 3004</h2>
        <p className="product-description">La famosa PSP. Ahora puede estar en tus manos pagando el modesto precio de 60€</p>
        <div className="product-price">
          <span className="price">60€</span>
        </div>
        <button className="add-to-cart">Añadir al carrito</button>
      </div>
    </div>
  );
}

export default ProductCard;
