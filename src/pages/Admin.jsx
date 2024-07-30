import React from 'react'
import { Link } from 'react-router-dom'

function Admin() {
  return (
    <>
    <div className='m-5' id='d1'>
        <Link to={'/addb'}><button className='btn btn-success btn-lg'>Add Book</button></Link><br />
        <Link  to={'/viewb'}><button className='btn btn-success btn-lg'>View Book</button></Link><br />
        {/* <Link to={'/editb'}><button className='btn btn-success btn-lg'>Edit Book</button></Link><br /> */}
        <Link  to={'/viewS'}><button className='btn btn-success btn-lg'>View Students</button></Link><br />
        <Link to={'/reservelist'}><button className='btn btn-success btn-lg'>View Reservation</button></Link><br />


    </div>
    
    </>
  )
}

export default Admin