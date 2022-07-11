import './App.css';
import {Routes, Route} from 'react-router-dom'
import ProductAll from './page/ProductAll'
import Login from './page/Login'
import PrivateRoute from './route/PrivateRoute' 
import Navbar from './components/Navbar'
import Cart from './page/Cart'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<ProductAll />} />
        <Route path='/login' element={<Login />} />
        <Route path='/product/:id' element={<PrivateRoute />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </div>
  )
}

export default App
