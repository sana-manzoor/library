import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { getuseremail } from '../services/allApis';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const navigate=useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault();
    const result=await getuseremail({email})
    console.log(result)
    if(result.status===200){
      toast.success("User verified Successfully..")
      localStorage.setItem("user", JSON.stringify(result.data._id));
      navigate('/changep')
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center mt-5">
      <h2 className='mb-4 display-6'>Forgot Password</h2>
      <Form  className="w-100" style={{ maxWidth: '400px' }}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email Address:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={(e)=>{handleSubmit(e)}} className="w-100 mt-4">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default ForgotPassword;
