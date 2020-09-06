import '../assets/css/App.css'
import React, { Component } from 'react'

import Input from './input'
import Dropdown from './dropdown'

class App extends Component {
  render() {
    return (
      <div>
        <Input />
        <Dropdown />
      </div>
    )
  }
}

export default App
