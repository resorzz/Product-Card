import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Box, Button } from '@mui/material';
import ProductCard from '../components/ProductCard';
import { db } from '../firebaseConfig'; // Importamos la DB
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { products as localProducts } from '../data/products'; // Tus datos actuales

export default function HomePage() {
  const [products, setProducts] = useState([]);

  // Función para subir tus productos a Firebase rápido (solo úsala una vez)
  // Replace just the seedDatabase function inside HomePage.js
const seedDatabase = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    
    if (querySnapshot.empty) {
      console.log("Uploading products...");
      // Promise.all ensures we wait for EVERY product to be written
      await Promise.all(localProducts.map(product => 
        addDoc(collection(db, "products"), product)
      ));
      
      alert("¡Éxito! 9 productos subidos a Firestore.");
      window.location.reload(); 
    } else {
      alert("La base de datos ya tiene productos.");
    }
  } catch (error) {
    console.error("Error seeding database: ", error);
    alert("Error: Revisa la consola (F12)");
  }
};

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(docs);
    };
    fetchProducts();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" fontWeight="bold">Hardware Store</Typography>
        {/* Este botón solo para que subas los datos a Firebase la primera vez */}
        {products.length === 0 && (
          <Button variant="outlined" onClick={seedDatabase} sx={{ mt: 2 }}>
            Cargar productos en Firebase
          </Button>
        )}
      </Box>

      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}