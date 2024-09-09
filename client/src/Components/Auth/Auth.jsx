import React, { useState } from 'react'
import {useCookies} from 'react-cookie'

const Auth = () => {

  const [cookie, setCookie, removeCookie] = useCookies(null)
  const [isLogIn, setIsLogin] = useState(true)
  const [error, setError] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const viewLogin = (status) =>{
    setError(null)
    setIsLogin(status)
  }

  const handleSubmit = async (e, endpoint) =>{
    e.preventDefault()

    if(password === '' || email === ''){
      setError('One of the input field is empty!')
      return
    }

    if(!isLogIn && password !== confirmPassword){
      setError('Make sure passwords match!')
      return
    }

    const response = await fetch(`${process.env.REACT_APP_SERVERURL}/${endpoint}`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
      })

      const data = await response.json()
      
      if(data.detail){
        setError(data.detail)  
      } else {
        setCookie('Email', data.email)
        setCookie('AuthToken', data.token)
        window.location.reload()
      }
  }
  
  
  return (
    <div className='auth-container'>
      <div className="auth-container-box">
        <form action="" >
          <h1>{isLogIn? 'Please log in' : 'Please sign up!'}</h1>
          <input 
          type="email" 
          placeholder='enter your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
          <input 
          type="password" 
          placeholder='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          />

          {!isLogIn && <input 
          type="password" 
          placeholder='confirm password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          />}
          
          <input 
          type="submit" 
          className="btn btn-primary btn-lg" 
          onClick={(e) => handleSubmit(e, isLogIn? 'login' : 'signup')}
          />
          {error && <p style={{color: 'red', fontSize: '18px', alignContent: 'center'}}>{error}</p>}
        </form>
        <div className="auth-options">
          <button 
            className=""
            onClick={() => viewLogin(true)}
            style={{backgroundColor: isLogIn ? 'rgb(255,255,255)' : 'rgb(188,188,188)'}}
            >Login</button>
          <button 
            className=""
            style={{backgroundColor: !isLogIn ? 'rgb(255,255,255)' : 'rgb(188,188,188)'}}
            onClick={() => viewLogin(false)}
            >Sign Up</button>
        </div>
      </div>      
    </div>
  )
}

export default Auth
