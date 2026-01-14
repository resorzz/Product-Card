import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      // Verificar si el producto ya existe para aumentar cantidad
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // Si no existe, lo añadimos con cantidad 1
      return [...prevCart, { ...product, quantity: 1 }];
    });
    console.log("Carrito actualizado:", cart); // Log silencioso para debug
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Calculamos el total de items (no solo tipos de productos, sino cantidad total)
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalItems }}>
      {children}
    </CartContext.Provider>
  );
};