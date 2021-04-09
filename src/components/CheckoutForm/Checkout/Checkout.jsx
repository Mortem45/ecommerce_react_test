import React from 'react'
import { CssBaseline, Paper, CardMedia, Typography, CardContent, CardActions, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

import useStyles from './styles'
import image from '../../../assets/qr.png'

const Checkout = ({ cart, onEmptyCart }) => {

  const classes = useStyles()

  console.log(cart);

  return (
    <>
      <CssBaseline />
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant='h4' align='center'>Checkout</Typography>
          <CardMedia className={classes.media} image={image} title={'image qr'}/>
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
          <Button onClick={onEmptyCart} component={Link} to='/' variant='contained' color='primary'>
            Pago en Efectivo
          </Button>
          </CardActions>
        </Paper>
      </main>
    </>
  )
}

export default Checkout