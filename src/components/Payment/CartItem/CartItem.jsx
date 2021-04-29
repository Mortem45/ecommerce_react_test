import React from 'react'
import { Typography, Card, CardContent, CardMedia } from '@material-ui/core'

import useStyles from './styles'

const CartItem = ({ item }) => {
  const classes = useStyles()


  return (
    <Card className='cart-item'>
      <CardMedia image={item.media.source} alt={item.name} className={classes.media} />
      <CardContent className={classes.cardContent}>
        <Typography variant='h4'>{item.name}</Typography>
        <Typography variant='h4'>&nbsp;{item.quantity}&nbsp;</Typography>
        <Typography variant='h5'>{item.line_total.formatted_with_symbol}</Typography>
      </CardContent>
    </Card>
  )
}

export default CartItem