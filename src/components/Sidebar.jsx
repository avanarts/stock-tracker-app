
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {



    return (
        <> 
        <div className='sidebar fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white p-4'>
            <h1 className='h1--welcome mb-4'>Welcome!</h1>

            <Link to='/' className="py-2 hover:bg-gray-700">Dashboard</Link>
            <Link to='about' className="py-2 hover:bg-gray-700">About</Link>
        </div>
        </>
    )
}