import React, { useEffect, useState } from 'react'
import './HomeUser.css'
import HomeUserHeader from '../../Components/HomeUserHeader/HomeUserHeader'
import TopJobCard from '../../Components/TopJobCard/TopJobCard'
import TopEmpCard from '../../Components/TopEmpCard/TopEmpCard'
import axios from 'axios'

const HomeUser = () => {
  const [userInfo, setUserInfo] = useState({});
  const [topJobs, setTopJobs] = useState([]);
  const [jobsForYou, setJobsForYou] = useState([]);
  const [topEmployees, setTopEmployees] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/homeuser-info", { withCredentials: true })
      .then(res => {
        setUserInfo(res.data);
        console.log("HomeUser info:", res.data);
      })
      .catch(() => setUserInfo({}));

    axios.get("http://localhost:5000/api/top-jobs", { withCredentials: true }) // <-- FIXED HERE
      .then(res => setTopJobs(res.data))
      .catch(() => setTopJobs([]));

    axios.get("http://localhost:5000/api/jobs-for-you", { withCredentials: true })
      .then(res => setJobsForYou(res.data))
      .catch(() => setJobsForYou([]));

    axios.get("http://localhost:5000/api/top-employees",{ withCredentials: true })
      .then(res => setTopEmployees(res.data))
      .catch(() => setTopEmployees([]));
  }, []);

  return (
    <div className='HomeUser'>
      <HomeUserHeader userInfo={userInfo} />
      <div className="topJobCorner">
        <div className="titlePart">
          <h1>TOP JOBS</h1>
        </div>
        <div className="cards">
          {topJobs.map(job => (
            <TopJobCard key={job._id} job={job} />
          ))}
        </div>
      </div>
      <div className="jobsForYouCorner">
        <div className="titlePart">
          <h1>JOBS FOR YOU</h1>
        </div>
        <div className="cards">
          {jobsForYou.map(job => (
            <TopJobCard key={job._id} job={job} />
          ))}
        </div>
      </div>
      <div className="topUserCorner">
        <div className="titlePart">
          <h1>TOP EMPLOYEE</h1>
        </div>
        <div className="cards">
          {topEmployees.map(emp => (
            <TopEmpCard key={emp._id} employee={emp} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomeUser;