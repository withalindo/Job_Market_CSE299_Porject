import React from 'react'
import './Jobs.css'
import HeaderUser from '../../Components/HeaderUser/HeaderUser'
import TopJobCard from'../../Components/TopJobCard/TopJobCard'

const Jobs = () => {
  return (
    <div className='jobs'>
      <div className="header">
        <HeaderUser />
      </div>
      <div className="JobsArea">
        <div className="searchPart">
          <form action="">
            <input type='type' placeholder='Search Jobs'></input>
            <button type='submit'>Search</button>
          </form>
          <div className="dropdownBoxPart">
            <label for="options">Catagory  </label>
            <select id="options" name="options">
              <option value="option1">Engineer</option>
              <option value="option2">All</option>
            </select>
          </div>
        </div>
        <div className="cardPart">
          <TopJobCard />
          <TopJobCard />
          <TopJobCard />
          <TopJobCard />
          <TopJobCard />
          <TopJobCard />
          <TopJobCard />
          <TopJobCard />
          <TopJobCard />
          <TopJobCard />
          <TopJobCard />
          <TopJobCard />
          <TopJobCard />
          <TopJobCard />
          <TopJobCard />
          <TopJobCard />
          <TopJobCard />
          <TopJobCard />
          <TopJobCard />
          <TopJobCard />
          
        </div>
      </div>
      
    </div>
  )
}

export default Jobs
