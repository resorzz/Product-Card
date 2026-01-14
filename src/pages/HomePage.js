import React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

export default function HomePage() {
  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          Catálogo High-End
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Componentes para entusiastas y overclocking
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}