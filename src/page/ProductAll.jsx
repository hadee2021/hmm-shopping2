import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import { useSearchParams } from 'react-router-dom'
import ProductCardSkeleton from '../components/ProductCardSkeleton'

const ProductAll = () => {
  const [productList, setProductList] = useState([])
  const [query] = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)

  const getProducts = async () => {
    let searchQuery = query.get('q') || ''
    let url = `https://my-json-server.typicode.com/hadee2021/hmm-shopping2/products?q=${searchQuery}`
    let response = await fetch(url)
    let data = await response.json()
    setProductList(data)
    setIsLoading(true)
  }

  useEffect(() => {
    getProducts()
  }, [query])

  return (
    <div>
      {isLoading ? (
      <div className="product-all-container">
        <div className="product-all">
          {productList.map((menu) => (
            <div key={menu.id} className="flex-center">
              <ProductCard  item={menu} />
            </div>
          ))}
        </div>
      </div>
      ) : (
        <ProductCardSkeleton />
      )}
    </div>
  )
}

export default ProductAll