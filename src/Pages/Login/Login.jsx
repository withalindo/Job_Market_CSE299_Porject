import React from 'react'
import "./Login.css"
import axios from 'axios';
const Login = () => {


    // Backend Integration
    const handlelogin = (e) => {
        e.preventDefault();

        const formData = {
            username: e.target.username.value,
            password: e.target.password.value,
        };
        if (!formData.username || !formData.password) {
            alert("Username and password are required!");
            return;
        }
        axios
            .post("http://localhost:5000/api/login", formData)
            .then((res) => {
                alert(res.data.message);
                console.log("Token:", res.data.token);
            })
            .catch((err) => {
                console.error("Login error:", err);
                alert("Login failed. Please check your credentials.");
            });

    }

    // Backend Integration (Working ongoing on it)
    // Google login Handlers
    // const handleGoogleLogin = () => {
    //     if (userType === "employee") {
    //         window.open("http://localhost:5000/auth/google");

    //     } else {
    //         window.open("http://localhost:5000/auth/google/company");
    //     }
    // };
    // Backend Integration (Working ongoing on it)

    return (
        <div className='login'>
            <div className="mainLoginArea">
                <div className="companyName">
                    <h1 className='job'>JOB <span className='market'>MARKET</span></h1>
                </div>

                <form onSubmit={handlelogin} className="inputfields">
                    <input name="username" type='text' placeholder='username' />
                    <input name="password" type='password' placeholder='password' />
                    <button>Login</button>
                </form>
                {/* Currently working on it faced a bug in the backend */}
                <div className="socialzone">
                    <h1>Or Login with</h1>
                    <div className="socialbtns">
                        <button>Google</button>
                        <button>Linkedin</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login