import React from 'react'
import './HomeUser.css'
import HomeUserHeader from '../../Components/HomeUserHeader/HomeUserHeader'
import TopJobCard from '../../Components/TopJobCard/TopJobCard'
import TopEmpCard from '../../Components/TopEmpCard/TopEmpCard'

const HomeUser = () => {
  return (
    <div className='HomeUser'> 
      <HomeUserHeader />
      <div className="topJobCorner">
        <div className="titlePart">
          <h1>TOP JOBS</h1>
        </div>
        <div className="cards">
          <TopJobCard />
          <TopJobCard />
        </div>
      </div>
      <div className="jobsForYouCorner">
        <div className="titlePart">
          <h1>JOBS FOR YOU</h1>
        </div>
        <div className="cards">
          <TopJobCard />
          <TopJobCard />
        </div>
      </div>
      <div className="topUserCorner">
        <div className="titlePart">
          <h1>TOP EMPLOYEE</h1>
        </div>
        <div className="cards">
          <TopEmpCard />
          <TopEmpCard />
          <TopEmpCard />
        </div>
      </div>
    </div>
  )
}

export default HomeUser
