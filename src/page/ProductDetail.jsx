import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { cartAtom } from '../Atom'
import {
  TextField,
  MenuItem
} from '@mui/material'

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
            <TextField
              id="outlined-select-currency"
              select
              label="Size"
              value={choiceSize}
              onChange={handleSelect}
              helperText="사이즈를 선택하세요"
              size='small'
              sx={{margin: 0}}
            >
              {product?.size.map((size, index) => (
                <MenuItem key={index} value={size}>
                  {size}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div>
            {/* 수량: <input type='number' className='product-detail-count' value={choiceCount} onChange={handleCount}/> */}
            <TextField
              id="standard-number"
              label="수량"
              type="number"
              className='product-detail-count'
              size='medium'
              value={choiceCount}
              onChange={handleCount}
              sx= {{width: '100px'}}
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
            />
          </div>
          <div className='product-detail-data-add' onClick={addCart}>추가</div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail