import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginApi } from '../services/allApis';
import { toast } from 'react-toastify';
import './login.css';

function Login() {
    const [logData, setLogData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = logData;

        if (!email || !password) {
            toast.warning("Enter Email and Password!");
        } else {
            const res = await loginApi(logData);
            if (res.status === 200) {
                localStorage.setItem("currentUser", JSON.stringify(res.data.excistingUser._id));
                localStorage.setItem("role", res.data.role);
                localStorage.setItem("token", res.data.token);
                toast.success("Login Successful!");
                setLogData({ email: "", password: "" });
                navigate(localStorage.getItem("role") === "admin" ? '/admin' : '/user');
            } else {
                toast.error("Login Failed!");
            }
        }
    };

    return (
        <>
            <h2 className='text-center display-6'>Login</h2>
            <div className='container d-flex justify-content-center align-items-center' style={{ minHeight: '60vh' }}>
                <form className='form-container' onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input type="email" className="form-control" id="email" placeholder="Enter email" 
                               name="email" value={logData.email} 
                               onChange={(e) => setLogData({ ...logData, email: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input type="password" className="form-control" id="password" placeholder="Enter password" 
                               name="password" value={logData.password} 
                               onChange={(e) => setLogData({ ...logData, password: e.target.value })} />
                    </div>
                    <div className='text-end mb-3'>
                          <Link to={'/forgotp'}>Forgot Password?</Link>
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mb-3">Sign in</button>
                    <div className="text-center">
                        <span>Don’t have an account? </span>
                        <Link to={'/reg'}>New user?Sign up</Link>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Login;
