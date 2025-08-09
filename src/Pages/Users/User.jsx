import React from 'react'
import HeaderUser from '../../Components/HeaderUser/HeaderUser'
import TopEmpCard from '../../Components/TopEmpCard/TopEmpCard'
import './User.css'
const User = () => {
  return (
    <div className='User'>
      <div className="header">
        <HeaderUser />
      </div>
      <div className="userArea">
        <div className="searchPart">
          <form action="">
            <input type='type' placeholder='Search Jobs'></input>
            <button type='submit'>Search</button>
          </form>
          <div className="dropdownBoxPart">
          <label>Catagory  </label>
            <select id="options" name="options">
              <option value="option1">Engineer</option>
              <option value="option2">All</option>
            </select>
        </div>
        </div>
        <div className="cardPart">
        <TopEmpCard />
        <TopEmpCard />
        <TopEmpCard />
        <TopEmpCard />
        <TopEmpCard />
        <TopEmpCard />
        <TopEmpCard />
      </div>
      </div>
      
    </div>
  )
}

export default User
