import React,{useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerApi } from '../services/allApis'

function Register() {

    const [regData,setRegData]=useState({
         name: "", gender: "", age: "", email: "", address: "", phone: "",password:""
    })

    const navigate=useNavigate()


    const handleRegistration = async (e) => {
        e.preventDefault()
        if (!regData.name || !regData.gender || !regData.age || !regData.email || !regData.address || !regData.phone || !regData.password) {
          // alert("Enter values for every fields!!")
         alert("Enter Valid Values!!")
        }
        else {
          const res = await registerApi(regData)
          console.log(res)
          if (res.status === 200) {
            alert(`Registration of ${res.data.name} is Successfull!!`)
            setRegData({  name: "", gender: "", age: "", email: "", address: "", phone: "",password:"" })
            navigate('/log')
          }
          else {
           alert(res.response)
          }
          // console.log(res.response.data)
        }
    
    
    
    
      }

console.log(regData)
    return (
        <>
            <h2 className='text-center display-6'>Register</h2>
            <div style={{ height: '90vh' }} className='d-flex justify-content-center align-items-center'>

                <form action="" className='w-50'>
                    <div className="mb-3 mt-3">
                        <label for="name" className="form-label">Name:</label>
                        <input type="text" className="form-control" id="name" placeholder="Enter name" name="name"  onChange={(e) => { setRegData({ ...regData, name: e.target.value }) }} />
                    </div>
                    <div class="mb-3 mt-3">
                        <label for="gender" className="form-label">Gender:</label><br />
                        <input type="radio" id='male' className="form-check-input" name="gender" value="male"  onChange={(e) => { setRegData({ ...regData, gender: e.target.value }) }}/>Male <input type="radio" className="form-check-input ms-4" id='female' name="gender" value="female" onChange={(e) => { setRegData({ ...regData, gender: e.target.value }) }}/>Female
                    </div>
                    <div class="mb-3 mt-3">
                        <label for="age" className="form-label">Age:</label>
                        <input type="number" className="form-control" id="age" placeholder="Age" name="age" onChange={(e) => { setRegData({ ...regData, age: e.target.value }) }}/>
                    </div>
                    <div class="mb-3 mt-3">
                        <label for="email" className="form-label">Email:</label>
                        <input type="email" className="form-control" id="email" placeholder="email" name="email" onChange={(e) => { setRegData({ ...regData, email: e.target.value }) }} />
                    </div>
                    <div class="mb-3">
                        <label for="address" className="form-label">Address:</label>
                        <textarea class="form-control" id="address" rows="3" onChange={(e) => { setRegData({ ...regData, address: e.target.value }) }}></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="phone" className="form-label">Phone:</label>
                        <input type="tel" className="form-control" id="phone" placeholder="phone" name="phone" onChange={(e) => { setRegData({ ...regData, phone: e.target.value }) }}/>
                    </div>
                    <div class="mb-3">
                        <label for="password" className="form-label">Password:</label>
                        <input type="password" className="form-control" id="password" placeholder="password" name="password" onChange={(e) => { setRegData({ ...regData, password: e.target.value }) }} />
                    </div>


                    <button type="submit" className="btn btn-primary" onClick={handleRegistration}>Sign up</button><Link to={'/log'}>Sign in</Link>
                </form>


            </div>
        </>
    )
}

export default Register