import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ItemPage from './pages/ItemPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ItemPage />} />
        {/* Future routes can go here */}
      </Routes>
    </Router>
  )
}

export default App