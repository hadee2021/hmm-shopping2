import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useRecoilState } from 'recoil'
import { authenticateAtom } from '../Atom'

const Login = () => {
  const[authenticate, setAuthenticate] = useRecoilState(authenticateAtom)

  const[email, setEmail] = useState('')
  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const navigate = useNavigate()
  const loginUser = (event) => {
    if(email) {
      event.preventDefault()
      setAuthenticate(true)
      navigate('/')
      return
    }
    alert('이메일을 입력하세요')
    return
  }

  return (
    <div className='login-area'>
      <form onSubmit={(event) => loginUser(event)}>
        <div className='login-input'>
          <input type='text' placeholder='이메일' value={email} onChange={handleEmail} /> 
          <input type='password' placeholder='비밀번호' />
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
  )
}

export default Login