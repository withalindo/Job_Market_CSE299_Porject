import React from 'react'
import "./TopEmpCard.css"

const TopEmpCard = ({ employee }) => {
  return (
    <div className='topEmpCard'>
      
      <div className="imagePart">
        {employee?.profileImage && (
          <img src={`http://localhost:5000/${employee.profileImage}`} alt={employee.fullname} />
        )}
      </div>
     
      <div className="infoPart">
        <h1>{employee?.fullname || "Employee Name"}</h1>
        <p>{employee?.profession || "Profession name"}</p>
        <button>Contact Now</button>
      </div>
    </div>
  )
}

export default TopEmpCard