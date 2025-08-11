import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './SignupEmp.css';
import axios from 'axios';

const SignupEmp = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Backend Integration

  const handleloginEmp = () => {
  window.location.href = "http://localhost:5173/login"; 
};

  

  
const handleSignupCom = () => {
    window.location.href = "http://localhost:5173/signupCom"; // Redirect to signup page
  };
  const handleSignupEmp = () => {
    alert("You are already on Employee Signup");
    window.location.href = "http://localhost:5173/signupEmp"; // Redirect to signup page
  };

  const handleEmployeeSignup = async (e) => {
    e.preventDefault();

    const formData = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
      confirmPassword: e.target.confirmPassword.value, // Add confirmPassword field
    };

    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      alert('All fields are required!');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/signup/employee', formData);
      if (response.status === 201) {
        alert(response.data.message);
        navigate('/PostSignupEmp'); // Redirect to PostSignupEmp page
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      console.error('Error during employee signup:', err);
      alert('Failed to create employee account.');
    }
  };

  return (
    <div className='signupemp'>
      <div className='mainPart'>
        <div className='textZone'>
          <h1 className='job'>
            JOB <span className='market'>MARKET</span>
          </h1>
          <div className='paragraphZone'>
            <p>
              This platform connects job seekers with the right opportunities and helps employers find qualified
              candidates quickly. Whether you're searching for your next role or hiring top talent, our intelligent
              matching system streamlines the process. Easy to use, fast, and reliable — it's your all-in-one solution
              for modern job searching and recruitment.
            </p>
          </div>
          <div className='buttonZone'>
            <button className='signupEmp'onClick={handleSignupEmp}>Signup as Employee</button>
            <button className='signupCom'onClick={handleSignupCom}>Signup as Company</button>
          </div>
        </div>

        <div className='formZone'>
          <h1 className='header'>Employee Signup</h1>
          <div className='formInput'>
            <form onSubmit={handleEmployeeSignup} className='form1'>
              <input name='username' type='text' placeholder='Username' />
              <input name='email' type='email' placeholder='Email' />
              <input name='password' type='password' placeholder='Password' />
              <input name='confirmPassword' type='password' placeholder='Re-enter Password' />
              <button type='submit'>Create Account</button>
            </form>
          </div>
          <div className='socialsignup'>
            <p>Or Register with </p>
            <div className='socialButtons'>
              {/* Google Signup Button */}
              <button onClick={() => window.open('http://localhost:5000/auth/google')}>Google</button>
              <button onClick={() => window.open('http://localhost:5000/auth/linkedin')}>Linkedin</button>
            </div>
            <h1>
              Already Have an Account <span className='special' onClick={handleloginEmp}>Login Here</span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupEmp;