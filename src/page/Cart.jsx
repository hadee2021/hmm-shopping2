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

  const deleteItem = (id, index) => {
    console.log(index)
    // const newCart = cart.filter((item) => item.id !== id)
    const newCart = cart.filter((item,i) => i !== index)
    console.log(newCart)
    setCart([...newCart])
    console.log(cart)
  }

  return (
    <div className='cart-area'>
      {cart.map((item, index) => (
        <div key={item.id + 100} className='item-card'> 
          <div onClick={() => moveToDetail(item.id)}>{item.title} {item.size}</div>
          <div>{item.price}</div>
          <div onClick={() => deleteItem(item.id, index)}><FontAwesomeIcon icon={faXmark} /></div>
        </div>
      ))}
      <div>총가격: {cart.reduce((sum,item) => {
        return sum + item.price
      },0)}</div>
    </div>
  )
}

export default Cart