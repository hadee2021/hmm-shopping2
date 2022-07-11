import React from 'react'
import { Navigate } from 'react-router-dom'
import ProductDetail from '../page/ProductDetail'

import { useRecoilState } from 'recoil'
import { authenticateAtom } from '../Atom'

const PrivateRoute = () => {
  const[authenticate] = useRecoilState(authenticateAtom)
  return (
    authenticate === true ? <ProductDetail/> : <Navigate to='/login' />
  )
}

export default PrivateRoute