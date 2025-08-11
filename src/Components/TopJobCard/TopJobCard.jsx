import React from 'react'
import "../../../BackEnd/src/models/Job.js"
import "./TopJobCard.css"

const TopJobCard = (props) => {
  const { job } = props;
  return (
    <div className='topjobcard'>

      <div className="part1">
        <img src={job?.image || job?.companyLogo || "https://placehold.co/364x200?text=No+Image"} alt={job?.companyName || job?.title || "Job Image"} />
      </div>

      <div className="part2">
        <h1>{job?.title || job?.company || "No Title"}</h1>
        <p>{job?.description || "No Description"}</p>
        <button onClick={() => alert("You have applied for the job: " + job?.title)}>Apply now</button>
      </div>
    </div>
  )
}

export default TopJobCard