import React, { useState, useEffect } from 'react'
import { Products, Navbar } from './components'
import { commerce } from './lib/commerce'

const App = () => {
  const [products, setProducts]= useState([])

  const fetchProduct = async () => {
    const { data } = await commerce.products.list()
    setProducts(data)
  }

  useEffect(() => {
    fetchProduct()
  }, [])

  return (
    <div>
      <Navbar />
      <Products products={products}/>
    </div>
  )
}
export default App