import React, { useState } from 'react'

const Auth = () => {

  const [isLogIn, setIsLogin] = useState(true)
  const [error, setError] = useState(null)
  const [email, setEmail] = useState('')
  const [passowrd, setPassword] = useState('')


  const viewLogin = (status) =>{
    setError(null)
    setIsLogin(status)
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
          className=''
          />
          <input 
          type="password" 
          placeholder='password'
          value={passowrd}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          />
          {!isLogIn && <input type="password" placeholder='confirm password'/>}
          <input type="submit" className="btn btn-primary btn-lg" />
          {error && <p>{error}</p>}
        </form>
        <div className="auth-options">
          <button 
          className=""
          style={{backgroundColor: !isLogIn ? 'rgb(255,255,255)' : 'rgb(188,188,188)'}}
          onClick={() => viewLogin(false)}
          >Sign Up</button>
          <button 
          className=""
          onClick={() => viewLogin(true)}
          style={{backgroundColor: isLogIn ? 'rgb(255,255,255)' : 'rgb(188,188,188)'}}
          >Login</button>
        </div>
      </div>      
    </div>
  )
}

export default Auth
