import React, { useContext } from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'

import { ProductContext } from '../../contexts/ProductContext'
import Product from '../components/Product'

const HomePage = () => {
    const {products} = useContext(ProductContext)

    const filteredProducts = products.filter(item => {
        return item.category
    })
    return (
        <div>
            <Header />
            <Hero />
            <h2 className='ml-[100px] mt-[40px] font-bold'>Your Published Game Packages:</h2>
            <section className='py-16'>
        <div className='container mx-auto'>
          <div className='grid grid-col-1 md:grid-cols-2 lg:grid-cols-4 xl: grid-cols-5 gap-[30px]
          max-w-sm mx-auto md:max-w-none md:mx-0'>
            {filteredProducts.map((product) => {
              return <Product product={product} key={product.id}/>
              
            })}
          </div>
        </div>
      </section>    
        </div>
    )
}

export default HomePage
