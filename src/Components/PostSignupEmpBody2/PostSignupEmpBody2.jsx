import React from 'react'
import axios from 'axios';
import "./PostSignupEmpBody2.css"
const PostSignupEmpBody2 = () => {
  // BackEnd Integration

  //   const [username, setUsername]       = React.useState("");
  // const [skills, setSkills]           = React.useState("");
  // const [summary, setSummary]         = React.useState("");
  // const [experiences, setExperiences] = React.useState("");
  // const [resumeFile, setResumeFile]   = React.useState(null);
  // const [loading, setLoading]         = React.useState(false);

  // const handleFileChange = (e) => {
  //   setResumeFile(e.target.files[0]);
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!username.trim() || !resumeFile) {
  //     return alert("Username and resume file are required.");
  //   }

  //   const formData = new FormData();

  //   formData.append("username", username.trim());
  //   formData.append("skills", skills);
  //   formData.append("summary", summary);
  //   formData.append("experiences", experiences);

  //   formData.append("resume", resumeFile);

  //   try {
  //     setLoading(true);
  //     const res = await axios.post(
  //       "http://localhost:5000/api/post-signup-emp2/upload-resume",
  //       formData,
  //       {
  //         headers: { "Content-Type": "multipart/form-data" }
  //       }
  //     );
  //     alert(res.data.message);
  //     // Optionally redirect or clear form...
  //   } catch (err) {
  //     console.error(err.response || err);
  //     alert(err.response?.data?.message || "Upload failed");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // BackEnd Integration

  return (
    <div className='postSignupEmpBody2'>
      <h1>Skill Information</h1>
      <form action='' className='skillForm'>
        <div className="upload">
          <button>Upload Resume</button>
          {/* <input
            name='Resume'
            type='file'
            onChange={handleFileChange}
          /> */}
        </div>
        <div className="texts">
          <h1>Skill: Engineer</h1>
          <h1><span className='summary'>Summary: </span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum rerum dolor minus similique tempora unde asperiores qui nulla sunt tenetur! Tenetur eaque est eum fugiat impedit placeat pariatur vel reprehenderit?</h1>
        </div>
        <div className="experiences">
          <textarea cols={60} rows={10} placeholder='Experience with duration'></textarea>
        </div>
        <div className="buttons">
          <button>back</button>
          <button>Get Started</button>
        </div>

      </form>
    </div>
  )
}

export default PostSignupEmpBody2
