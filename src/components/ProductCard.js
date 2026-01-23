import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, Button, CardActionArea } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Link } from 'react-router-dom'; // <--- Importante para la navegación
import { useCart } from '../context/CartContext';

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* El CardActionArea hace que toda la parte superior sea un link al detalle */}
      <CardActionArea component={Link} to={`/product/${product.id}`}>
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
      </CardActionArea>

      <CardActions>
        <Button 
          variant="contained" 
          startIcon={<AddShoppingCartIcon />} 
          fullWidth
          onClick={(e) => {
            e.preventDefault(); // Evita que al dar a "Añadir" se navegue al detalle
            addToCart(product);
          }}
        >
          Añadir
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;