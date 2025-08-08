import React from 'react'
import './HomeUserHeader.css'

const HomeUserHeader = () => {
  return (
    <div className='HomeUserHeader'>
        <div className="namePart">
            <h1><span className='welcomePart'>Welcome </span> Sayed Ashrafi</h1>
        </div>
        <div className="catagoryPart">
            <h1><span className='catagory'>Catagory</span> Engineer</h1>
        </div>
    </div>
  )
}

export default HomeUserHeader
