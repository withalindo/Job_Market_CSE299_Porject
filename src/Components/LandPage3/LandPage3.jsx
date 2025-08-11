import React, { useRef, useEffect, useState } from 'react'
import "./LandPage3.css"
import TopJobCard from '../TopJobCard/TopJobCard'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TopEmpCard from '../TopEmpCard/TopEmpCard';
import axios from 'axios';

const LandPage3 = () => {
  gsap.registerPlugin(ScrollTrigger);
  const topJobRef = useRef();
  const cardRef1 = useRef();
  const topEmpRef = useRef();
  const cardRef2 = useRef();

  const [jobs, setJobs] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/all-jobs")
      .then(res => setJobs(res.data.slice(0, 3))) // show 3 jobs
      .catch(() => setJobs([]));
    axios.get("http://localhost:5000/api/employees")
      .then(res => setEmployees(res.data.slice(0, 3))) // show 3 employees
      .catch(() => setEmployees([]));
  }, []);

  useGSAP(()=>{
    gsap.from(topJobRef.current,{
      x:300,
      opacity:0,
      duration:1,
      scrollTrigger:{
        trigger:".LandPage3",
        scroller:"body",
        start:"top 70%",
        end:"top 70%",
        scrub:2,
      }
    })
  })
  useGSAP(()=>{
    gsap.from(topEmpRef.current,{
      x:-300,
      opacity:0,
      duration:1,
      scrollTrigger:{
        trigger:".LandPage3",
        scroller:"body",
        start:"top 20%",
        end:"top 20%",
        scrub:2,
      }
    })
  })
  useGSAP(()=>{
    gsap.from(cardRef1.current,{
      x:-300,
      opacity:0,
      duration:1,
      stagger:0.4,
      scrollTrigger:{
        trigger:".LandPage3",
        scroller:"body",
        start:"top 45%",
        end:"top 45%",
        scrub:2,
      }
    })
  })
  useGSAP(()=>{
    gsap.from(cardRef2.current,{
      x:300,
      opacity:0,
      duration:1,
      stagger:0.4,
      scrollTrigger:{
        trigger:".LandPage3",
        scroller:"body",
        start:"top 5%",
        end:"top 5%",
        scrub:2,
      }
    })
  })

  return (
    <div className='LandPage3'>
      <div className="topJob">
        <h1 ref={topJobRef}>TOP JOBS</h1>
        <div ref={cardRef1} className="jobcards">
          {jobs.map(job => (
            <TopJobCard key={job._id} job={job} />
          ))}
        </div>
      </div>
      <div className="topEmp">
        <h1 ref={topEmpRef} className='topEmpHead'>TOP EMPLOYEES</h1>
        <div ref={cardRef2} className="empcards">
          {employees.map(emp => (
            <TopEmpCard key={emp._id} employee={emp} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default LandPage3
