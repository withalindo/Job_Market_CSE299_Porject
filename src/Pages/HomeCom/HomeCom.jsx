import React from 'react'
import NavbarCom from '../../Components/NavbarCom/NavbarCom'
import './HomeCom.css'
import JobPost from '../../Components/JobPost/JobPost'
import TopEmpCard from '../../Components/TopEmpCard/TopEmpCard'
import TopJobCard from '../../Components/TopJobCard/TopJobCard'

const HomeCom = () => {
  return (
    <div className='HomeCom'>
      <div className="header">
        <NavbarCom />
      </div>
      <div className="jobPostField">
        <JobPost />
        <div className="topJobField">
            <div className="headingPart1">
                <h1>Top Job</h1>
            </div>
            <div className="cards">
                <TopJobCard />
                <TopJobCard />
            </div>
        </div>
        <div className="topUserField">
            <div className="headingPart2">
                <h1>Top Users</h1>
            </div>
            <div className="cards">
                <TopEmpCard />
                <TopEmpCard />
            </div>
        </div>
      </div>
    </div>
  )
}

export default HomeCom
