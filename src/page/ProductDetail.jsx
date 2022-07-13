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
  const [choiceCount, setChoiceCount] = useState(1)

  const handleSelect = (e) => {
    setChoiceSize(e.target.value)
  }

  const handleCount = (e) => {
    setChoiceCount(Number(e.target.value))
  }

  const navigate = useNavigate()

  const addCart = () => {
    if(!choiceSize) {
      alert('사이즈를 선택하세요')
      return
    }
    else if(choiceCount < 1) {
      alert('수량은 1개 이상 가능합니다')
      return
    }
    const choiceItem = {
      id: product.id,
      idTime: new Date(),
      title: product.title,
      price: product.price,
      size: choiceSize,
      count: choiceCount
    }
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
          <div>₩ {product?.price} </div>
          <div>
            <select onChange={handleSelect} value={choiceSize}>
              {product?.size.map((size, index) => (
                <option key={index} value={size} >{size}</option>
              ))}
            </select>
          </div>
          <div>
            수량: <input type='number' className='product-detail-count' value={choiceCount} onChange={handleCount}/>
          </div>
          <div onClick={addCart}>추가</div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail