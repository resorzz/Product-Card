import React from 'react';
import ProductCard from './components/ProductCard';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Tienda de Productos</h1>
      </header>
      <main>
        <ProductCard />
      </main>
    </div>
  );
}

export default App;
