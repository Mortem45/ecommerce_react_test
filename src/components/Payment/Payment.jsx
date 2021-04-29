import React,{ useEffect, useState  } from 'react'
import { Container, Typography, Button, Grid} from '@material-ui/core'
import CartItem from './CartItem/CartItem'
import { Link } from 'react-router-dom'
import useStyles from './styles'

const Payment = ( {user, onEmptyCart} ) => {
  const classes = useStyles()
  const [cart, setCart] = useState({})
  const [_user, _setUser] = useState({})
  const [_items, _setItems] = useState([])
  const cartId = window.location.pathname.split('/')[2]

  const fetchCart = async () => {
    const url = `https://api.chec.io/v1/carts/${cartId}`
    const token = process.env.REACT_APP_CHEC_SECRET_KEY
    const obj = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Authorization': `${token}`
      }}

    const  data  = await fetch(url, obj).then(res => res.json())
    setCart(data)
    let __items = []
    data.line_items.forEach(item => {
      let it =  {
        id: item.id,
        name: item.name,
        price: item.price.formatted_with_symbol
      }
      __items.push(it)
    })
    _setItems(__items);
  }

  const fetchSaldo = async () => {
    const url = 'http://192.168.1.128:9000/'
    const graphql = JSON.stringify({
      query: `query {\n    UserByEmail (email: \"${user.email}\") {\n        _id\n        email\n        saldo\n    }\n}`,
    })
    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: graphql,
      redirect: 'follow'
    };

    fetch(url, requestOptions)
      .then(response => response.text())
      .then(result => {
        const res =  JSON.parse(result).data.UserByEmail
        console.log(res);
        _setUser(res)
      })
      .catch(error => console.log('error', error));
  }

  const handlerPayment = async () => {
    const url = 'http://192.168.1.128:9000/'
    const graphql = JSON.stringify({
      query: `mutation{\n	updateUser(_id: \"${_user._id}\", user: {\n    saldo: \"${_user.saldo -cart.subtotal.raw}\"\n  })\n}`,
    })

    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: graphql,
      redirect: 'follow'
    };

    fetch(url, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error))



    const order = {
      value: cart.subtotal.formatted_with_symbol,
      email: user.email,
      items: _items
    }

    let itemparse = ""
    _items.forEach(item => {
      let x= `{id: "${item.id}" name: "${item.name}" price: "${item.price}"}`
      itemparse += x
    })

    const graphqlcart = JSON.stringify({
      query: `mutation{\n	saveCart(input: {\n    value: \"${order.value}\"\n    email: \"${order.email}\"\n    items:[ ${itemparse}]\n  })\n}`,
    })
    const requestOptionsCarts = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: graphqlcart,
      redirect: 'follow'
    };

    fetch(url, requestOptionsCarts)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error))

    onEmptyCart()
  }

  useEffect(() => {
    fetchCart()
    fetchSaldo()
  }, [])

  const payment = () => {
    handlerPayment()
    onEmptyCart()
  }

  if (!cart.line_items) return 'Loading'
  console.log(cart);
  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant='h3' gutterBottom>Tu  compra</Typography>
        <>
        <Grid container spacing={3}>
          {cart.line_items.map((lineItem) => (
            <Grid item xs={12} sm={4} key={lineItem.id}>
              <CartItem item={lineItem} />
            </Grid>
          ))}
        </Grid>
        <div className={classes.cardDetails}>
          <div className={classes.cardDetailsprice}>
            <Typography variant='h5'>Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
            <Typography variant='h5'>En Cartera: Q.{_user.saldo}</Typography>
            <Typography variant='h5'>Saldo: Q.{_user.saldo -cart.subtotal.raw }</Typography>
          </div>
          <div>
            <Button className={classes.emptyButton} size='large' type='button' variant='contained' color='secondary' onClick={onEmptyCart}>Empty cart</Button>
            <Button className={classes.checkoutButton} component={Link} to='/user' size='large' type='button' variant='contained' onClick={payment} color='primary'>Pagar</Button>
          </div>
        </div>
      </>
    </Container>
  )
}

export default Payment