import React from 'react'
import Snake from './Snake/Snake'
import { Route, Routes } from 'react-router-dom'
// import Authorization from './Authorization/Authorization'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Snake />} />
    </Routes>
  )
}

export default App