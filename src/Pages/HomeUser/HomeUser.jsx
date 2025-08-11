import React, { useEffect, useState } from 'react'
import './HomeUser.css'
import HomeUserHeader from '../../Components/HomeUserHeader/HomeUserHeader'
import TopJobCard from '../../Components/TopJobCard/TopJobCard'
import TopEmpCard from '../../Components/TopEmpCard/TopEmpCard'
import Navbar from '../../Components/Navbar/Navbar'
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

    axios.get("http://localhost:5000/api/all-jobs", { withCredentials: true })
      .then(res => {
        const jobs = res.data;
        setJobsForYou(jobs.slice(0, 5)); 
        const midStart = Math.floor(jobs.length / 2) - 2;
        setTopJobs(jobs.slice(Math.max(0, midStart), Math.max(0, midStart + 4)));
        console.log("Fetched jobs:", res.data);
      })
      .catch(() => {
        setJobsForYou([]);
        setTopJobs([]);
      });

    axios.get("http://localhost:5000/api/employees", { withCredentials: true })
      .then(res => setTopEmployees(res.data))
      .catch(() => setTopEmployees([]));
  }, []);

  return (
    <div className='HomeUser'>
      <HomeUserHeader userInfo={userInfo} />
      <Navbar />
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
          {topEmployees.slice(0, 3).map(emp => (
            <TopEmpCard key={emp._id} employee={emp} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomeUser;