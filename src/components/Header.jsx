import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Header() {

  const navigate=useNavigate()

  const logOut=async()=>{
   localStorage.clear()
   navigate('/')
  }
  return (
    <>
    <div style={{height:'67px',backgroundColor:'purple'}} className='d-flex justify-content-center'>
      
    <Link to={'/log'}><button  className='btn btn-dark btn-lg me-5 p-3'>Log In</button></Link> 
        <button onClick={logOut} className='btn btn-dark btn-lg '>Log out</button>
      
    </div>
    </>
  )
}

export default Header