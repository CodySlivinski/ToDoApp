import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import {Card} from 'react-bootstrap'

export default function Login() {
    const { login } = useAuth()
    const navigate = useNavigate()

    async function handleAuth (){
        await login()
        return navigate('/')
    }

  return (
    <div className='login'>
        <div className='container'>
            <Card className='m-2 border-dark text-center'>
                <Card.Header className='bg-dark text-white'>
                    <h2>Login for full functionality!</h2>
                </Card.Header>
                <Card.Body>
                    <button className="btn btn-success" onClick={() => handleAuth()}>
                        Login w/ GitHub
                    </button>
                </Card.Body>
            </Card>
        </div>
    </div>
  )
}
