import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { authenticateAtom, cartAtom } from '../Atom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

const Cart = () => {
  const[authenticate, setAuthenticate] = useRecoilState(authenticateAtom)
  const[cart, setCart] = useRecoilState(cartAtom)
  const[totalPrice, setTotalPrice] = useState(0)
  console.log(cart)

  useEffect(() => {
    setAuthenticate(!authenticate)
  },[])

  useEffect(() => {
    let total = cart.reduce((sum,item) => {
      return sum + (item.price * item.count)
    },0)
    setTotalPrice(total)
  },[cart])

  
  const navigate = useNavigate()
  const moveToDetail = (id) => {
    navigate(`/product/${id}`)
  }

  if(!authenticate) {
    navigate('/')
  }

  const deleteItem = (idTime) => {
    console.log(idTime)
    const newCart = cart.filter((item) => item.idTime !== idTime)
    setCart([...newCart])
  }

  const payment = () => {
    alert(`총 ${totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원 결제완료!! 감사합니다`)
    setAuthenticate(!authenticate)
    setCart([])
  }

  return (
    <div className='cart-area'>
      {cart.map((item) => (
        <div key={item.idTime} className='item-card'> 
          <div onClick={() => moveToDetail(item.id)}>{item.title} {item.size}</div>
          <div>{item.count}개</div>
          <div>{item.price}</div>
          <div onClick={() => deleteItem(item.idTime)}><FontAwesomeIcon icon={faXmark} /></div>
        </div>
      ))}
      <div className='total-price'>
        총가격: <span>{totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span> 원 
      </div>
      <div className='payment' onClick={payment}>결제하기</div>
    </div>
  )
}

export default Cart