import React from 'react'
import './JobPost.css'
import axios from 'axios';
const JobPost = () => {

  //Backend Integration

  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    Salary: '',
    category: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/post-job', formData,
        {
          withCredentials: true

        });
        alert(res.data.message);

    } catch (error) {
      alert(error.response?.data?.message || "Failed to post job. Please try again.");
      console.error("Error posting job:", error);
    }


  }

  //Backend Integration

  return (
    <div className='JobPost'>
      <div className="headingPart">
        <h1>POST A JOB</h1>
      </div>
      <div className="formPart">
        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <input type='text' placeholder='Job Title' name='title' value={formData.title} onChange={handleChange} />
            <input type='text' placeholder='Add A Small Description' name='description' value={formData.description} onChange={handleChange} />
            <input type="text" placeholder='Salary Range' name='Salary' value={formData.salary} onChange={handleChange} />
            <input type="text" placeholder='Catagory' name='category' value={formData.category} onChange={handleChange} />
            <button type='submit'>Post Job</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default JobPost
