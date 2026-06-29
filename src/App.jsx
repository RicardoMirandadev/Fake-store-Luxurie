import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Inicio from './pages/Inicio'
import NoVendemos from './pages/NoVendemos'
import PagProducto from './pages/PagProducto'

function App() {
  
  return (
    <>
    
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Inicio/>}/>
      <Route path="/products/:id" element={<PagProducto/>}/>
      <Route path="*" element={<NoVendemos/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
