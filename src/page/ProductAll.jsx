import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import { useSearchParams } from 'react-router-dom'

const ProductAll = () => {
  const [productList, setProductList] = useState([])
  const [query] = useSearchParams()

  const getProducts = async () => {
    let searchQuery = query.get('q') || ''
    let url = `https://my-json-server.typicode.com/hadee2021/hmm-shopping2/products?q=${searchQuery}`
    let response = await fetch(url)
    let data = await response.json()
    setProductList(data)
  }

  useEffect(() => {
    getProducts()
  }, [query])

  return (
    <div>
      <div className="product-all-container">
        <div className="product-all">
          {productList.map((menu) => (
            <div key={menu.id} className="flex-center">
              <ProductCard  item={menu} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductAll