import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { increment } from '../store/slices/cartSlice'
import Button from '@mui/material/Button';


function Home() {
    const dispatch = useDispatch()
    const [data, setData] = useState([])

    useEffect(() => {
        getProducts()
    }, [])



    const getProducts = async () => {
        try {
            let response = await axios.get("http://localhost:9000/product/products")
            setData(response.data.data)

        } catch (error) {
            console.log("Get All Products Error", error)
        }
    }
    const getCategory = async (category) => {
        try {
            let response = await axios.get(`http://localhost:9000/product/product/${category}`)
            setData(response.data.data)

        } catch (error) {
            console.log("Category Error", error)
        }
    }
    const handleButtonClick = (category) => {
        getCategory(category)
    }

    return (
        <>
            <div className="flex p-2 space-x-2">
            <Button onClick={() => handleButtonClick(getProducts())} variant="outlined" size="small" color="inherit" >Tüm Ürünler</Button>
            <Button onClick={() => handleButtonClick('Börek')} variant="outlined" size="small" color="inherit" >Börek</Button>
            <Button onClick={() => handleButtonClick('Atıştırmalık')} variant="outlined" size="small" color="inherit" >Atıştırmalık</Button>
            <Button onClick={() => handleButtonClick('Gıda')} variant="outlined" size="small" color="inherit" >Gıda</Button>

            </div>

            <div className='grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
                {
                    data && data.map((product, key) => (
                        <div key={key} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <a href="#">
                                <img
                                    className="p-8 rounded-t-lg"
                                    style={{ minHeight: "300px", maxHeight: "300px" }}
                                    src={product.image}
                                    alt="product image"
                                />
                            </a>
                            <div className="px-5 pb-5">
                                <a href="#">
                                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                        {product.productName}
                                    </h5>
                                </a>
                                <a href="#">
                                    <h5 className="text-m font-semibold tracking-tight text-gray-900 dark:text-white">
                                        {product.company}
                                    </h5>
                                </a>
                                <div className="flex items-center justify-between">
                                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                                        ₺{product.price}
                                    </span>
                                    <button
                                        onClick={() => dispatch(increment(product))}
                                        className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800"
                                    >
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                        </div>


                    ))
                }
            </div>
        </>
    )
}

export default Home