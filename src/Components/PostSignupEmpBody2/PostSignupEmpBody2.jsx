import React from 'react'
import axios from 'axios';
import "./PostSignupEmpBody2.css"

const PostSignupEmpBody2 = () => {
  const [username, setUsername] = React.useState("");
  const [resumeFile, setResumeFile] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [skill, setSkill] = React.useState("");
  const [summary, setSummary] = React.useState("");
  const [experiences, setExperiences] = React.useState("");

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !resumeFile) {
      return alert("Username and resume file are required.");
    }

    const formData = new FormData();
    formData.append("username", username.trim());
    formData.append("resume", resumeFile);
    formData.append("experiences", experiences);

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/post-signup-emp2/upload-resume",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" }
        }
      );
      alert(res.data.message);
      setSkill(res.data.skills || "");
      setSummary(res.data.summary || "");
      // Redirect to login page after success
      setTimeout(() => {
        window.location.href = "/login";
      }, 5000);
    } catch (err) {
      console.error(err.response || err);
      alert(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='postSignupEmpBody2'>
      <h1>Skill Information</h1>
      <form className='skillForm' onSubmit={handleSubmit}>
        <div className="username">
          <input
            type="text"
            placeholder='Username'
            required
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className="upload">
          <input
            name='resume'
            type='file'
            accept=".pdf"
            required
            onChange={handleFileChange}
          />
        </div>
        <div className="texts">
          <input
            type="text"
            name='skill'
            placeholder='Skills'
            value={skill}
            readOnly
          />
          <h1>
            <span className='summary'>Summary: </span>
            {summary ? summary : "Upload your resume to get a summary."}
          </h1>
        </div>
        <div className="experiences">
          <textarea
            cols={60}
            rows={10}
            placeholder='Experience with duration'
            value={experiences}
            onChange={e => setExperiences(e.target.value)}
          />
        </div>
        <div className="buttons">
          <button type="button">Back</button>
          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Get Started"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default PostSignupEmpBody2