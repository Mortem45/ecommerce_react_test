import React, { useState, useEffect } from 'react'
import { Grid, Card,CardContent} from '@material-ui/core'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Order from './Order/Order'
import useStyles from './styles';



const User = ({ user}) => {
  const classes = useStyles();
  const [_user, _setUser] = useState({})
  const [orders, setOrders] = useState([])
  const [expanded, setExpanded] = React.useState(false)


  const fetchOrders = async () => {
    const url = 'http://192.168.1.128:9000/'
    const graphql = JSON.stringify({
      query: `query{\n  cartsByEmail(_email: \"${user.email}\"){\n    _id\n    email\n    value\n    items{\n      id\n      name\n      price\n    }\n  }\n}`
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

    let ordersByUser = []
    fetch(url, requestOptions)
      .then(response => response.text())
      .then(result => {
        const res =  JSON.parse(result).data.cartsByEmail
        res.forEach(order => {
          console.log(order);
          ordersByUser.push(order)
        })
        setOrders(ordersByUser)
      })
      .catch(error => console.log('error', error));
    // data.forEach(order => {
    //   if (order.customer.id === user.id) {
    //     ordersByUser.push(order)
    //   }
    // })
    console.log('adad');
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

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  useEffect(() => {
    fetchOrders()
    fetchSaldo()
  }, [])

  console.log(orders);
  return (
    <main className={classes.content} >
      <div className={classes.toolbar}/>
      <Card className='cart-item' className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography variant='h5'>{_user.email}</Typography>
          <Typography variant='h5'>{`Saldo en Cuenta Q. ${_user.saldo}.00`}</Typography>
        </CardContent>
      </Card>
      <Grid container justify="center" spacing={4}>
        <div className={classes.root2}>
          <Grid item key={123} xs={12} sm={6} md={4} lg={3}>
        { orders.map((order) => (
          <Accordion key={order.id} expanded={expanded === `${order._id}`} onChange={handleChange(`${order._id}`)}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1bh-content'
              id='panel1bh-header'
            >
              <Typography className={classes.heading}>{`TOTAL ${order.value}`}</Typography>
              <Typography className={classes.secondaryHeading}>{}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ul>
                {
                  order.items.map(item => (
                    <li key={order.items.id}><Typography>{`${item.name}  ${item.price}`}</Typography></li>
                  ))
                }
              </ul>
            </AccordionDetails>
          </Accordion>
          // <Order order={order} />
        ))}
          </Grid>
        </div>
      </Grid>
    </main>
  )
}

export default User