import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import Navigation from "./components/Navigation"
import RouterConfig from "./router"

const App = () => {
  return (
    <Router>
      <Navigation />
      <RouterConfig />
    </Router>
  )
}

export default App
