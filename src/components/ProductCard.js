import React from 'react';
import './ProductCard.css';

const ProductCard = () => {
  return (
    <div className="product-card">
      <div className="product-card__image">
        <img src="https://via.placeholder.com/250x350" alt="Auriculars Inalàmbrics Pro" />
      </div>
      
      <div className="product-card__info">
        <h2 className="product-card__title">Auriculars Inalàmbrics Pro</h2>
        <p className="product-card__description">
          Cancel·lació de soroll avançada, 30 hores de bateria i so d'alta fidelitat. El disseny ergonòmic garanteix la màxima comoditat.
        </p>
        
        <div className="product-card__price-section">
          <span className="product-card__current-price">99,99 €</span>
          <span className="product-card__old-price">149,99 €</span>
        </div>
        
        <button className="product-card__btn">Afegir a la cistella</button>
      </div>
    </div>
  );
};

export default ProductCard;
