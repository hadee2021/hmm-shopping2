import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { cartAtom } from '../Atom'

const ProductDetail = () => {
  const[cart, setCart] = useRecoilState(cartAtom)

  let {id} = useParams()
  const [product, setProduct] = useState(null)
  const getProductDetail = async () => {
    let url = `https://my-json-server.typicode.com/hadee2021/hmm-shopping2/products/${id}`
    let response = await fetch(url)
    let data = await response.json()
    setProduct(data)
  }

  useEffect(() => {
    getProductDetail()
  }, [])

  const [choiceSize, setChoiceSize] = useState("")

  const handleSelect = (e) => {
    setChoiceSize(e.target.value)
    console.log(e.target.value)
  }

  const navigate = useNavigate()

  const addCart = () => {
    console.log(product)
    const choiceItem = {
      id: product.id,
      title: product.title,
      price: product.price
    }
    console.log(choiceItem)
    setCart([...cart, choiceItem])
    alert(`${product?.title} 추가 되었습니다`)
    navigate('/')
  }
  return (
    <div className='product-detail'>
      <div>
        <img src={product?.img} />
      </div>
      <div>
        <div className='product-detail-data'>
          <div>{product?.title}</div>
          <div>{product?.price}</div>
          <div>
            <select onChange={handleSelect} value={choiceSize}>
              {product?.size.map((size, index) => (
                <option key={index} value={size} >{size}</option>
              ))}
            </select>
          </div>
          <div onClick={addCart}>추가</div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail