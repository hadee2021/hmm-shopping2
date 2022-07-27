import { useState } from 'react'
import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { cartAtom } from '../Atom'
import { TextField, MenuItem, Skeleton, Box } from '@mui/material'

const ProductDetail = () => {
  const[cart, setCart] = useRecoilState(cartAtom)

  let { id } = useParams()
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
      alert('size를 선택하세요')
      return
    }
    else if(choiceCount < 1) {
      alert('수량은 1개 이상 가능합니다')
      return
    }
    else if(!Number.isInteger(choiceCount)) {
      alert('수량은 정수만 가능 합니다')
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
    <div className="product-detail">
      <div>
        {product?.img ? (
          <img src={product?.img} className="product-detail-img"/>
        ) : (
          <Skeleton variant="rectangular" width={640} height={960} />
        )}
      </div>
      <div>
        <div className="product-detail-data">
          {product?.title ? (
            <div>{product?.title}</div>
          ) : (
            <Box sx={{ pt: 0.5 }}>
              <Skeleton variant="rectangular" width={100} height={21}/>
            </Box>
          )}
          {product?.price ? (
            <div>₩ {product?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} </div>
            ) : (
              <Box sx={{ pt: 0.5 }}>
                <Skeleton variant="rectangular" width={100} height={33}/>
              </Box>
            )}
          <div>
            <TextField
              id="outlined-select-currency"
              select
              label="Size"
              value={choiceSize}
              onChange={handleSelect}
              helperText="사이즈를 선택하세요"
              size="small"
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
            <TextField
              id="standard-number"
              label="수량"
              type="number"
              className="product-detail-count"
              size="medium"
              value={choiceCount}
              onChange={handleCount}
              sx={{width: "100px"}}
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
            />
          </div>
          <div 
            className="product-detail-data-add" 
            onClick={addCart}
          >
            추가
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail