import { Skeleton } from "@mui/material"
import { Box } from "@mui/system"


const ProductCardSkeleton = () => {
  const skeletonMap = [1,2,3,4,5,6,7,8]
  return (
    <div className="product-all-container">
      <div className="product-all">
        {skeletonMap.map(x => (
          <div key={x}>
            <div className="product-card">
              <Skeleton variant="rectangular" width={250} height={380} />
              <Box sx={{ pt: 0.5 }}>
                <Skeleton width={100}/>
                <Skeleton width={100} />
              </Box>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductCardSkeleton