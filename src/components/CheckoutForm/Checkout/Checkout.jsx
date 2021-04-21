import React, { useEffect, useState } from 'react'
import { CssBaseline, Paper,  Typography, CardContent, CardActions, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import QRCode from 'react-qr-code'
import { commerce } from '../../../lib/commerce'

import useStyles from './styles'

const Checkout = ({ cart, onEmptyCart, refreshCart }) => {
  // const [order, setOrder] = useState({})
  // const [checkoutToken, setCheckoutToken] = useState(null);
  // const [errorMessage, setErrorMessage] = useState('')

  const classes = useStyles()

  // useEffect(() => {
  //   if (cart.id) {
  //     const generateToken = async () => {
  //       try {
  //         const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
  //         setCheckoutToken(token);
  //       } catch {
  //         // if (activeStep !== steps.length) history.push('/');
  //       }
  //     };

  //     generateToken()
  //   }

  // }, [cart])

  useEffect(() => {
    console.log('enviado a la base',cart)
  },[])

  // const handleCaptureCheckout = async (newOrder) => {
  //   try {
  //     console.log(checkoutToken.id);
  //     const incomingOrder = await commerce.checkout.capture(checkoutToken.id, newOrder)

  //     setOrder(incomingOrder);

  //     refreshCart();
  //   } catch (error) {
  //     setErrorMessage(error.data.error.message);
  //   }
  // }

  return (
    <>
      <CssBaseline />
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant='h4' align='center'>Checkout</Typography>
          <Typography variant='h5' align='center'>Scanee el codigo QR para pagar</Typography>
          <QRCode className={classes.media}
            value={cart.hosted_checkout_url}
            size={340}
            />
          <CardContent>
            <div className={classes.cardContent}>
              <Typography variant='h5' gutterBottom>
                {`SubTotal: ${cart.subtotal.formatted_with_symbol}`}
              </Typography>
            </div>
            <Typography dangerouslySetInnerHTML={{ __html: cart.id}} variant='body2' color='textSecondary' />
          </CardContent>
          <CardActions disableSpacing className={classes.CardActions}>
          <Button onClick={onEmptyCart} component={Link} to='/' variant='contained' color='secondary'>
            Cancelar Compra
          </Button>
          <Button onClick={refreshCart} component={Link} to='/' variant='contained' color='primary'>
            Nueva Venta
          </Button>
          </CardActions>
        </Paper>
      </main>
    </>
  )
}

export default Checkout