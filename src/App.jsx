import { useState } from 'react'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Register from './Components/Register'
import Login from './Components/Login'
import Home from './Components/Home'
import Preview from './Components/Preview'
import OrderDetails from './Components/OrderDetails'

function App() {
  const [auth, setAuth] = useState(false)

  return (
   <Routes>
    <Route path="/" element={<Navigate to="/login" />} />
    <Route path="/login" element={<Login setAuth={setAuth}/>} />
    <Route path="/register" element={<Register />} />
    <Route path="/home"
    element={auth ? <Home setAuth={setAuth}/> : <Navigate to="/login"/>}/>
    <Route path="/preview" element={auth ? <Preview setAuth={setAuth}/> : <Navigate to="/home"/>}/>
    <Route path="/orderDetails" element={auth ? <OrderDetails setAuth={setAuth}/> : <Navigate to="/home"/>}/>
   </Routes>
  )
}

export default App
