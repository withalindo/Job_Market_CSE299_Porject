import React from 'react'
import "./TopJobCard.css"

const TopJobCard = ({ job }) => {
  if (!job) return null;
  return (
    <div className='topjobcard'>
      <div className="part1">
        {/* Show company logo from uploads if available */}
        {job.companyLogo ? (
          <img src={`http://localhost:5000/${job.companyLogo}`} alt={job.companyName || "Company Logo"} />
        ) : (
          <img src="/default-logo.png" alt="Default Company Logo" />
        )}
      </div>
      <div className="part2">
        <h1>{job.companyName || "Company Name"}</h1>
        <h2>{job.title || "Job Title"}</h2>
        <p>{job.description || "No description provided."}</p>
        <p><b>Location:</b> {job.location || "Not specified"}</p>
        <p><b>Category:</b> {job.category || "Not specified"}</p>
        <button>Apply now</button>
      </div>
    </div>
  )
}

export default TopJobCard