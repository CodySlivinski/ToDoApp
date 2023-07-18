import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import AuthProvider from './contexts/AuthContext'
import Login from './components/Auth/Login'
import Logout from './components/Auth/Logout'
import Home from './components/Home/Home'
import Categories from './components/Categories/Categories'
import ToDos from './components/ToDos/ToDos'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'





export default function App() {
  return (
    <div className='App'>
      <AuthProvider>
        <Router>
          <Navigation />
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='categories' element={<ProtectedRoute><Categories/></ProtectedRoute>}/>
            <Route path='todos' element={<ProtectedRoute><ToDos/></ProtectedRoute>}/>
            <Route path='*' element={<NotFound/>}/>
            <Route path='login' element={<Login/>}/>
            <Route path='logout' element={<Logout/>}/>
            <Route path='*' element={ <NotFound /> } />
          </Routes>
          <Footer />
        </Router>
      </AuthProvider>

    </div>
  )
}
