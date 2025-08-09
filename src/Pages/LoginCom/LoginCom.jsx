import React from 'react'
import axios from 'axios';
// import '../Login/Login.css'
const LoginCom = () => {

   // Backend Integration
    const handlelogin = (e) => {
        e.preventDefault();

        const formData = {
            companyName: e.target.username.value,
            password: e.target.password.value,
        };
        if (!formData.companyName || !formData.password) {
            alert("Company Name and password are required!");
            return;
        }
        axios
            .post("http://localhost:5000/api/company-login", formData, { withCredentials: true }) // <-- Added withCredentials
            .then((res) => {
                alert(res.data.message);
                window.location.href = "/HomeCom";
                console.log("Token:", res.data.token);
            })
            .catch((err) => {
                console.error("Login error:", err);
                alert("Login failed. Please check your credentials.");
            });

    }

    // Google login Handlers (work in progress)
    const handleGoogleLogin = () => {
        window.open("http://localhost:5000/auth/google/company");
    };

  return (
    <div className='login'>
      <div className="mainLoginArea">
                <div className="companyName">
                    <h1 className='job'>JOB <span className='market'>MARKET</span></h1>
                </div>

                <form onSubmit={handlelogin} className="inputfields">
                    <input name="username" type='text' placeholder='Company Name' />
                    <input name="password" type='password' placeholder='password' />
                    <button>Login</button>
                </form>
                {/* Currently working on it faced a bug in the backend */}
                <div className="socialzone">
                    <h1>Or Login with</h1>
                    <div className="socialbtns">
                        <button onClick={handleGoogleLogin}>Google</button>
                        <button>Linkedin</button>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default LoginCom
