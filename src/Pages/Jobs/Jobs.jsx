import React, { useEffect, useState } from 'react'
import './Jobs.css'
import HeaderUser from '../../Components/HeaderUser/HeaderUser'
import TopJobCard from '../../Components/TopJobCard/TopJobCard'
import axios from 'axios'

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [employee, setEmployee] = useState(null);

  // Fetch employee info on mount
  useEffect(() => {
    axios.get("http://localhost:5000/api/employee-info", { withCredentials: true })
      .then(res => {
        setEmployee(res.data);
        console.log("Employee info:", res.data); // Debug log
      })
      .catch(() => setEmployee(null));
  }, []);

  // Fetch jobs whenever search or category changes
  useEffect(() => {
    let url = "http://localhost:5000/api/jobs?";
    if (search) url += `search=${encodeURIComponent(search)}&`;
    if (category && category !== "All") url += `category=${encodeURIComponent(category)}&`;
    axios.get(url)
      .then(res => setJobs(res.data))
      .catch(err => console.error(err));
  }, [search, category]);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div className='jobs'>
      <div className="header">
        <HeaderUser fullname={employee?.fullname} category={category} />
      </div>
      <div className="JobsArea">
        <div className="searchPart">
          <form onSubmit={handleSearch}>
            <input
              type='text'
              placeholder='Search Jobs'
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button type='submit'>Search</button>
          </form>
          <div className="dropdownBoxPart">
            <label htmlFor="options">Catagory  </label>
            <select id="options" name="options" value={category} onChange={handleCategoryChange}>
              <option value="Engineering">Engineer</option>
              <option value="Analytics">Analytics</option>
              <option value="Marketing">Marketing</option>
              <option value="Design">Design</option>
              <option value="All">All</option>
            </select>
          </div>
        </div>
        <div className="cardPart">
          {jobs.length > 0 ? (
            jobs.map(job => (
              <TopJobCard key={job._id} job={job} />
            ))
          ) : (
            <div className="noJobs">No jobs found for this category.</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Jobs