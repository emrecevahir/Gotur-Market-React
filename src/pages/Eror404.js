import React from 'react'
import { Link } from 'react-router-dom'

function Eror404() {
    return (
        <div className='mt-4 flex justify-center text-center'>
            <div>
                <p className='text-red-400 text-5xl'>404</p>
                <p className='text-red-800 text-2xl block'>Page Not Found</p>
                <div className='mt-7'>
                    <Link to="/" className='bg-gray-600 text-white hover:bg-gray-400 rounded-full px-10 py-2'>Home Page</Link>
                </div>
            </div>
        </div>
    )
}

export default Eror404