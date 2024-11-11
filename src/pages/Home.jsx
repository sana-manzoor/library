import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section d-flex align-items-center justify-content-center text-center " style={{ height: '300px' }}>
        <div>
          <h1 className="display-4">Welcome to Library</h1>
          <p className="lead">Discover and reserve your favorite books online.</p>
          <div className="mt-4">
        <button className="btn btn-primary  me-2"> <Link to={'/reg'} className='text-light text-decoration-none'>Sign Up</Link></button>
        <button className="btn btn-secondary" ><Link to={'/log'} className='text-light text-decoration-none'>Sign In</Link></button>
      </div>

        </div>
      </section>

     

      
    </div>
  );
}

export default Home;
