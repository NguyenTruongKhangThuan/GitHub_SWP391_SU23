import React from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'

const Sales = () => {
  return (
    <div>
      <Header/>
      <div className='py-[100px]'>
          <section className='container mx-auto'>
            <div className='flex gap-x-20'>
                <div className='flex flex-col'>
                    <h2 className='text-xl font-bold mb-6'>Sales Report</h2>
                    <div className='bg-gray-400 w-[1000px] h-[600px] mt-7'>
                        <h2 className='text-xl text-white p-4 font-bold'>Chart</h2>
                        <div className=''>
                            {/* Insert chart into here */}
                        </div>
                    </div>
                </div>
                {/* Best Sellers */}
                <div className='bg-gray-400 w-[300px] h-[680px]'>
    
                </div>
            </div>
            </section>
      </div>
      <Footer/>
    </div>
  )
}

export default Sales
