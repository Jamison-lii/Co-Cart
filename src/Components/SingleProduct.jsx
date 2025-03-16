import React, { useContext, useEffect } from 'react'
//import { Shopcontext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom'
import Breadcrum from './BreadCrumb'
import ProductDisplay from './ProductDisplay'
import DescriptionBox from './DescriptionBox'
import NewCollection from './NewCollection'

const SingleProduct = () => {
   // const {all_product} = useContext(Shopcontext)
   // const {productId} = useParams()
   // const product = all_product.find((e) => e.id === Number(productId))

    useEffect(()=> {
        window.scrollTo(0,0)
    },[])
    
  return (
    <div className='max-w-7xl mx-auto mb-32 mt-32'>
      <Breadcrum     />
      <ProductDisplay     />
      <DescriptionBox/>
      <NewCollection/>
    </div>
  )
}

export default SingleProduct
