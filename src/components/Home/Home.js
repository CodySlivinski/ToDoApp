import React from 'react'
import Login from '../Auth/Login'
import { useAuth } from '../../contexts/AuthContext'
import './Home.css'


export default function Home() {
  const { currentUser } = useAuth()

  return (
    <div className="home">
        <h1 className='justify-content-center'>The To-Do App</h1>
        <hr />
        <h3>
            <em>
            “One part at a time, one day at a time, we can accomplish any goal we set for ourselves.”
            </em>
             - Karen Casey
        </h3>
        {!currentUser && 
        <Login />
        }
    </div>

  )
}
