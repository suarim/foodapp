// mongodb+srv://suarim:<password>@cluster0.sbmoe8u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
import React from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Home from './screens/Home'
import Login from './screens/Login'
import Signup from './screens/signup'
import { CartProvider } from './Components/Contextreducer'
// import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
// import '../node_modules/bootstrap-dark-5/dist/js/bootstrap.bundle'
// import '../node_modules/bootstrap-dark-5/dist/js/bootstrap.bundle.min.js'
function App() {
  return (
    <CartProvider>
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element=<Home/>/>
          <Route exact path='/login' element=<Login/>/>
          <Route exact path='/createuser' element=<Signup/>/>
          {/* <Route exact */}
        </Routes>
      </div>
    </Router>
    </CartProvider>
  )
}

export default App
