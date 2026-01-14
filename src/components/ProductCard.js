import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, Button } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useCart } from '../context/CartContext'; // <--- Importamos el hook

function ProductCard({ product }) {
  const { addToCart } = useCart(); // <--- Recuperamos la función

  return (
    <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="140"
        image={product.img}
        alt={product.name}
        sx={{ objectFit: 'contain', p: 2, bgcolor: '#f5f5f5' }} 
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {product.description.substring(0, 80)}...
        </Typography>
        <Typography variant="h6" color="primary" fontWeight="bold">
          {product.price.toFixed(2)}€
        </Typography>
      </CardContent>
      <CardActions>
        <Button 
          variant="contained" 
          startIcon={<AddShoppingCartIcon />} 
          fullWidth
          onClick={() => addToCart(product)} // <--- Acción real sin popup molesto
        >
          Añadir
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;