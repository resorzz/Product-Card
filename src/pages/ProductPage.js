import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Grid, Typography, Button, Paper, CircularProgress } from '@mui/material';
import { db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useCart } from '../context/CartContext';

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProduct({ id: docSnap.id, ...docSnap.data() });
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  if (loading) return <Container sx={{ mt: 8, textAlign: 'center' }}><CircularProgress /></Container>;
  if (!product) return <Typography sx={{ mt: 8, textAlign: 'center' }}>Producto no encontrado</Typography>;

  return (
    <Container sx={{ mt: 8 }}>
      <Button onClick={() => navigate(-1)}>Volver</Button>
      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
            <img src={product.img} alt={product.name} style={{ maxWidth: '100%', maxHeight: '400px' }} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h3" fontWeight="bold">{product.name}</Typography>
          <Typography variant="h4" color="primary" sx={{ my: 2 }}>{product.price}€</Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>{product.description}</Typography>
          <Button variant="contained" size="large" fullWidth onClick={() => addToCart(product)}>
            Añadir al carrito
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}