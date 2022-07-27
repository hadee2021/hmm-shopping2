import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { authenticateAtom } from '../Atom'
import { 
  TextField,
  Button,
  Paper,
  Box,
  Typography,
  InputLabel,
  InputAdornment,
  IconButton,
  FormControl,
  OutlinedInput
} from '@mui/material'
import {
  Lock,
  LockOpen
} from '@mui/icons-material'

const Login = () => {
  const[authenticate, setAuthenticate] = useRecoilState(authenticateAtom)

  const[email, setEmail] = useState('')
  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const[showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
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
    <div className="login-area">
      <form onSubmit={(event) => loginUser(event)}>
        <Paper elevation={5} className="login-input">
          <Box
            sx= {{
              display: "flex",
              flexFlow: "column",
              padding: "15px 20px"
            }}
          >
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <TextField 
              label="이메일" 
              name="email" 
              margin="normal"
              required 
              fullWidth
              size="small"
              autoComplete="email"
              value={email}
              onChange={handleEmail}
            />
            <FormControl 
              sx={{ m: 1, width: "30ch", margin: "8px 0" }} 
              variant="outlined" 
              required 
            >
              <InputLabel 
                htmlFor="outlined-adornment-password" 
                sx={{ marginBottom: "10px"}}
              >
                비밀번호
              </InputLabel>
              <OutlinedInput
                size="small"
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <LockOpen /> : <Lock />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <Button 
              variant='contained' 
              type="submit" 
              sx={{mt:3, mb: 2}}
            >
              로그인
            </Button>
          </Box>
        </Paper>
      </form>
    </div>
  )
}

export default Login