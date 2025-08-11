import React from 'react'
import "./TopEmpCard.css"
import "../../../BackEnd/src/models/Employee.js"

const TopEmpCard = (props) => {
  const { employee } = props;
  return (
    <div className='topEmpCard'>

      <div className="imagePart">
        {/* <img src={employee?.profileImage || ""}/> */}
      </div>
      
      

      <div className="infoPart">
        <h1>{employee?.fullname}</h1>
        <p>{employee?.skills}</p>
        <button onClick={() => alert("Employee's Contact details: " + employee?.fullname + " \n " + employee?.email+" \n " + employee?.phoneNumber)}>Contact Now</button>
      </div>
    </div>
  )
}

export default TopEmpCard;