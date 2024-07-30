import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginApi } from '../services/allApis'


function Login() {

    const [logData,setLogData]=useState({
        email:"",password:""
    })

    const navigate=useNavigate()
    const handleLogin = async (e) => {
        e.preventDefault()
        console.log(logData)
        const { email, password } = logData
        if (!email || !password) {
          alert("Enter Email and Password!!")
        }
        else {
          const res = await loginApi(logData)
          console.log(res)
          if (res.status === 200) {
            localStorage.setItem("currentUser", JSON.stringify(res.data.excistingUser._id))
            localStorage.setItem("role", res.data.role)
            localStorage.setItem("token", res.data.token)
            alert("Login Successfull!!")
            setLogData({ email: "", password: "", })
            if(localStorage.getItem("role")=="admin"){
                navigate('/admin')
            }
            else{
              navigate('/user')
            }
          }
          else {
            alert("Login Failed!!")
          }
        }
      }


  return (
    <>
    <h2 className='text-center display-6'>Login</h2>
    <div style={{ height: '60vh' }} className='d-flex justify-content-center align-items-center'>

        <form action="" className='w-50'>
            
            <div class="mb-3 mt-3">
                <label for="email" className="form-label">Email:</label>
                <input type="email" className="form-control" id="email" placeholder="email" name="email" onChange={(e) => { setLogData({ ...logData, email: e.target.value }) }} />
            </div>
           
            <div class="mb-3">
                <label for="password" className="form-label">Password:</label>
                <input type="password" className="form-control" id="password" placeholder="password" name="password" onChange={(e) => { setLogData({ ...logData, password: e.target.value }) }} />
            </div>


            <button type="submit" className="btn btn-primary" onClick={handleLogin}>Sign in</button><Link to={'/reg'}>Sign up</Link>
        </form>


    </div>
    </>
  )
}

export default Login