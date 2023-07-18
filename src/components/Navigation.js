import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'


export default function Navigation() {
  const { currentUser } = useAuth()

  return (
    <Navbar expand='md' bg='dark' variant='dark' sticky='top' className='p-3'>
        <Navbar.Brand href='/'>To-Do</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
            <Nav>
                <Link to='/categories' className='nav-link'>Categories</Link>
                <Link to='/todos' className='nav-link'>To-Do</Link>
                <Link to='/' className='nav-link'>Home</Link>
                {!currentUser && 
                    <Link to='/login' className='nav-link'>
                        Login
                    </Link>
                }
                {currentUser && 
                    <Link to='/logout' className='nav-link'>
                        Logout
                    </Link>
                }
            </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
}
