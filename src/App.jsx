import { Navigate, Route, Routes } from "react-router-dom"
import Header from "./components/Layout/Header"
import Home from "./components/pages/Home"
import Login from "./components/pages/Login"
import ProtectedRoute from "./components/ProtectedRoute"
import Dashboard from "./components/pages/Dashboard"
import Products from "./components/pages/Products"
import Orders from "./components/pages/Orders"


function App() {
  

  return (
    <>
    <Header/>
    <div className="container-page">
   <Routes>
<Route path="/" element={<Home/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/admin" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
<Route path="/admin/products" element={<ProtectedRoute><Products/></ProtectedRoute>}/>
<Route path="/admin/orders" element={<ProtectedRoute><Orders/></ProtectedRoute>}/>
<Route path="*" element= {<Navigate to= "/" replace/>}/>
   </Routes>
   </div>  
    </>
  )
}

export default App
