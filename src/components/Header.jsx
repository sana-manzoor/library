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
    <div style={{marginTop:'67px'}} className='d-flex justify-content-end'>
      
        <button onClick={logOut} className='btn btn-primary me-3 '>Log out</button>
      
    </div>
    </>
  )
}

export default Header