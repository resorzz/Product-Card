import React, { useState } from 'react';
import { Container, Grid, Typography, List, ListItem, ListItemText, Button, Divider, Paper, Box } from '@mui/material';
import { useCart } from '../context/CartContext';
import StripeCheckout from '../components/StripeCheckout';
import PayPalCheckout from '../components/PayPalCheckout';

export default function CartPage() {
  const { cart, removeFromCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  
  // URL de tu servidor backend que ya tienes corriendo en el puerto 4242
  const apiBaseUrl = "http://localhost:4242";
  const currency = "EUR";

  // Cálculo del total
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <Container sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h5">Tu carrito está vacío.</Typography>
        <Button variant="contained" href="/" sx={{ mt: 2 }}>Volver a la tienda</Button>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4, mb: 8 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">Resumen de Compra</Typography>
      
      <Grid container spacing={4}>
        {/* Columna Izquierda: Lista de productos */}
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <List>
              {cart.map((item) => (
                <React.Fragment key={item.id}>
                  <ListItem secondaryAction={
                    <Button color="error" size="small" onClick={() => removeFromCart(item.id)}>Eliminar</Button>
                  }>
                    <ListItemText 
                      primary={item.name} 
                      secondary={`${item.quantity} x ${item.price.toFixed(2)}€`} 
                    />
                    <Typography variant="body1" fontWeight="medium">
                      {(item.quantity * item.price).toFixed(2)}€
                    </Typography>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Columna Derecha: Pago */}
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 3, bgcolor: '#fcfcfc' }}>
            <Typography variant="h6" gutterBottom>Total a pagar</Typography>
            <Typography variant="h3" color="primary" sx={{ mb: 3, fontWeight: 'bold' }}>
              {total.toFixed(2)}€
            </Typography>

            {!showCheckout ? (
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth 
                size="large"
                onClick={() => setShowCheckout(true)}
              >
                Pagar Ahora
              </Button>
            ) : (
              <Box sx={{ mt: 2 }}>
                {/* Componente de Stripe */}
                <Box sx={{ mb: 4, p: 2, border: '1px solid #e0e0e0', borderRadius: 2 }}>
                  <StripeCheckout 
                    amount={total} 
                    currency={currency} 
                    apiBaseUrl={apiBaseUrl} 
                  />
                </Box>

                <Divider sx={{ my: 2 }}>O paga con</Divider>

                {/* Componente de PayPal */}
                <Box sx={{ mt: 2 }}>
                  <PayPalCheckout 
                    amount={total} 
                    currency={currency} 
                    apiBaseUrl={apiBaseUrl} 
                  />
                </Box>
                
                <Button 
                  fullWidth 
                  variant="text" 
                  onClick={() => setShowCheckout(false)} 
                  sx={{ mt: 2 }}
                >
                  Cancelar
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}