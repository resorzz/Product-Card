import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // <--- Importamos el hook

export default function Navbar() {
  const { totalItems } = useCart(); // <--- Usamos el dato global

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          Maspons Hardware
        </Typography>
        <Button color="inherit" component={Link} to="/">Inicio</Button>
        <IconButton color="inherit" component={Link} to="/cart">
          <Badge badgeContent={totalItems} color="secondary"> {/* <--- Dato dinámico */}
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}