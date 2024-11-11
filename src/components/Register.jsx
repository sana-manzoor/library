import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerApi } from '../services/allApis';
import './register.css';
import { toast } from 'react-toastify';

function Register() {
    const [regData, setRegData] = useState({
        name: "", gender: "", age: "", email: "", address: "", phone: "", password: ""
    });

    const [focus, setFocus] = useState({
        errName: false,
        errEmail: false,
        errPassword: false
    });

    const navigate = useNavigate();

    const handleRegistration = async (e) => {
        e.preventDefault();
        if (!regData.name || !regData.gender || !regData.age || !regData.email || !regData.address || !regData.phone || !regData.password) {
            toast.error("Please fill out all fields!");
        } else {
            const res = await registerApi(regData);
            if (res.status === 200) {
                toast.success(`Registration of ${res.data.name} is successful!`);
                setRegData({ name: "", gender: "", age: "", email: "", address: "", phone: "", password: "" });
                navigate('/log');
            } else {
                toast.error(res.response);
            }
        }
    };

    return (
        <>
            <h2 className='text-center display-6'>Register</h2>
            <div className='container d-flex justify-content-center align-items-center' style={{ minHeight: '90vh' }}>
                <form className='form-container' onSubmit={handleRegistration}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name:</label>
                        <input type="text" className="form-control" id="name" placeholder="Enter name" name="name"
                            required value={regData.name} onChange={(e) => setRegData({ ...regData, name: e.target.value })}
                            pattern='^[a-zA-Z].{4,16}' onBlur={() => setFocus({ ...focus, errName: true })}
                        />
                        <span className="form-text">*Enter a valid name (5-16 characters).</span>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Gender:</label><br />
                        <input type="radio" className="form-check-input" name="gender" value="male" id="male"
                            onChange={(e) => setRegData({ ...regData, gender: e.target.value })} />
                        <label htmlFor="male" className="form-check-label ms-2">Male</label>
                        <input type="radio" className="form-check-input ms-4" name="gender" value="female" id="female"
                            onChange={(e) => setRegData({ ...regData, gender: e.target.value })} />
                        <label htmlFor="female" className="form-check-label ms-2">Female</label>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="age" className="form-label">Age:</label>
                        <input type="number" className="form-control" id="age" placeholder="Enter age" name="age"
                            required value={regData.age} onChange={(e) => setRegData({ ...regData, age: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input type="email" className="form-control" id="email" placeholder="Enter email" name="email"
                            required value={regData.email} onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                            onBlur={() => setFocus({ ...focus, errEmail: true })}
                        />
                        <span className="form-text">*Enter a valid email address.</span>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address:</label>
                        <textarea className="form-control" id="address" rows="3" placeholder="Enter address" required
                            value={regData.address} onChange={(e) => setRegData({ ...regData, address: e.target.value })}>
                        </textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone:</label>
                        <input type="tel" className="form-control" id="phone" placeholder="Enter phone number" name="phone"
                            required value={regData.phone} onChange={(e) => setRegData({ ...regData, phone: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input type="password" className="form-control" id="password" placeholder="Enter password" name="password"
                            required value={regData.password} onChange={(e) => setRegData({ ...regData, password: e.target.value })}
                            pattern='^(?=.*[a-zA-Z])(?=.*\d).{4,}$' onBlur={() => setFocus({ ...focus, errPassword: true })}
                        />
                        <span className="form-text">*Password must contain at least 4 characters with letters and numbers.</span>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Sign Up</button>
                    <div className="text-center mt-3">
                        <Link to={'/log'}>Already have an account? Sign in</Link>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Register;
