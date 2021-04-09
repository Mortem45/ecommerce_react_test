import React, { useState, useEffect } from 'react'
import { Products, Navbar, Cart, Checkout } from './components'
import { commerce } from './lib/commerce'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const App = () => {
  const [products, setProducts]= useState([])
  const [cart, setCart] = useState({})

  const fetchProduct = async () => {
    const { data } = await commerce.products.list()
    setProducts(data)
  }

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve())
  }

  const handleAddToCart = async (productId, quanitity) => {
    const item = await commerce.cart.add(productId,quanitity)
    setCart(item.cart)
  }

  const handleUpdateCartQty = async (lineItemId, quantity) => {
    const response = await commerce.cart.update(lineItemId, { quantity })

    setCart(response.cart)
  }

  const handleRemoveFromCart = async (lineItemId) => {
    const response = await commerce.cart.remove(lineItemId)

    setCart(response.cart)
  }

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty()

    setCart(response.cart)
  }

  useEffect(() => {
    fetchProduct()
    fetchCart()
  }, [])


  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items}/>
        <Switch>
          <Route exact path='/'>
            <Products products={products} onAddToCart={handleAddToCart}/>
          </Route>
          <Route exact path='/cart'>
            <Cart
              cart={cart}
              onUpdateCartQty={handleUpdateCartQty}
              onRemoveFromCart={handleRemoveFromCart}
              onEmptyCart={handleEmptyCart}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}
export default App