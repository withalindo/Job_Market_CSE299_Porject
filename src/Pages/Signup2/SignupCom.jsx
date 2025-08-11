import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const SignupCom = () => {
  const navigate = useNavigate();

  // Backend Integration

  const handleloginCom = () => {
  window.location.href = "http://localhost:5173/loginCom"; // Redirect to login page
};

const handleSignupCom = () => {
  alert("You are already on Company Signup");
  window.location.href = "http://localhost:5173/signupCom"; // Redirect to signup page
};
const handleSignupEmp = () => {
  window.location.href = "http://localhost:5173/signupEmp"; // Redirect to signup page
};

  const handleCompanySignup = (e) => {
  e.preventDefault();

  const formData = {
    companyName: e.target.companyName.value,
    email: e.target.email.value,
    password: e.target.password.value,
    confirmPassword: e.target.confirmPassword.value,
  };

  if (!formData.companyName || !formData.email || !formData.password || !formData.confirmPassword) {
    alert("All fields are required!");
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  axios
    .post("http://localhost:5000/api/signup/company", formData)
    .then((res) => {
      alert(res.data.message);
      navigate("/PostSignupCom"); 
    })
    .catch((err) => {
      console.error("Error during company signup:", err);
      alert(err.response?.data?.message || "Failed to create company account.");
    });
};
  // Backend Integration

  return (
    <div className='signupemp'>
      <div className="mainPart">
        <div className="textZone">
          <h1 className='job'>JOB <span className='market'>MARKET</span></h1>
          <div className="paragraphZone">
            <p>This platform connects job seekers with the right opportunities and helps employers find qualified candidates quickly. Whether you're searching for your next role or hiring top talent, our intelligent matching system streamlines the process. Easy to use, fast, and reliable — it's your all-in-one solution for modern job searching and recruitment.</p>
          </div>
          <div className="buttonZone">
            <button className='signupCom'onClick={handleSignupEmp}>Signup as Employee</button>
            <button className='signupEmp'onClick={handleSignupCom}>Signup as Company</button>
          </div>
        </div>

        <div className="formZone">
          <h1 className='header'>Company Signup</h1>
          <div className="formInput">
            <form onSubmit={handleCompanySignup} className='form1'>
              <input name="companyName" type='text' placeholder='Company name'/>
              <input name="email" type='email' placeholder='Email'/>
              <input name="password" type='password' placeholder='Password'/>
              <input name="confirmPassword" type='password' placeholder='Re-enter Password'/>
              <button type='submit'>Create Account</button>
            </form>
          </div>
          <div className="socialsignup">
            <p>Or Register with </p>
            <div className="socialButtons">
              {/* Made a change here in google button */}
              <button onClick={() => window.open("http://localhost:5000/auth/google/company")}>Google</button>
              <button onClick={() => window.open("http://localhost:5000/auth/linkedin/company")}>Linkedin</button>
            </div>
            <h1>Already Have an Account <span className='special' onClick={handleloginCom}>Login Here</span></h1>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default SignupCom
