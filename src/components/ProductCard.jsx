import { useNavigate } from 'react-router-dom'

const ProductCard = ({item}) => {
  const navigate = useNavigate()
  const showDetail = () => {
    navigate(`/product/${item.id}`)
  }

  return (
    <div>
      <div className="product-card" onClick={showDetail}>
        <img src={item?.img} />
        <div>{item?.title}</div>
        <div>
          ₩ {item?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </div>
      </div>
    </div>
  )
}

export default ProductCard