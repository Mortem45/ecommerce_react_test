import React, { Component } from 'react'
import { Products, Navbar } from './components'
export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Products />
      </div>
    )
  }
}
