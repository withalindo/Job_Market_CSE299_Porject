import React from 'react'
import './HeaderUser.css'

const HeaderUser = ({ fullname, category }) => {
  return (
    <div className='HomeUserHeader'>
        <div className="namePart">
            <h1>
              <span className='fullname'>Name</span> {fullname || "User Name"}
            </h1>
        </div>
        <div className="catagoryPart">
            <h1>
              <span className='catagory'>Catagory</span> {category || "Category"}
            </h1>
        </div>
    </div>
  )
}

export default HeaderUser