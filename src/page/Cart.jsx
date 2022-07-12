import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { authenticateAtom, cartAtom } from '../Atom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
// import Item from '../components/Item'

const Cart = () => {
  const[authenticate, setAuthenticate] = useRecoilState(authenticateAtom)
  const[cart, setCart] = useRecoilState(cartAtom)

  useEffect(() => {
    setAuthenticate(!authenticate)
  },[])

  console.log(authenticate)
  console.log(cart)
  const navigate = useNavigate()
  const moveToDetail = (id) => {
    navigate(`/product/${id}`)
  }

  if(!authenticate) {
    navigate('/')
  }

  const deleteItem = (index) => {
    const newCart = cart.filter((item,i) => i !== index)
    setCart([...newCart])
  }

  const payment = () => {
    alert('결제완료!! 감사합니다')
    setAuthenticate(!authenticate)
    setCart([])
  }

  return (
    <div className='cart-area'>
      {cart.map((item, index) => (
        <div key={item.id + index} className='item-card'> 
          <div onClick={() => moveToDetail(item.id)}>{item.title} {item.size}</div>
          <div>{item.price}</div>
          <div onClick={() => deleteItem(index)}><FontAwesomeIcon icon={faXmark} /></div>
        </div>
      ))}
      <div className='total-price'>
        총가격: <span> {cart.reduce((sum,item) => {
        return sum + item.price
        },0)} </span> 원
      </div>
      <div className='payment' onClick={payment}>결제하기</div>
    </div>
  )
}

export default Cart