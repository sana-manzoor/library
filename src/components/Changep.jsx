import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { Toast } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Form, Button, Container } from 'react-bootstrap';
import { changePassword } from '../services/allApis';


function Changep() {
    const [password, setPassword] = useState();

    const [cpassword, setCpassword] = useState()

    const navigate=useNavigate()
  
    const handleSubmit = async(e) => {
      e.preventDefault();
      const id = JSON.parse(localStorage.getItem("user"))
      console.log(id)

        if(password != cpassword){
            toast.error("Password and Confirm Password are not same..")
        }
        else{
      const result=await changePassword(id,{password})
      console.log(result)
      if(result.status===200){
        toast.success("Password changed Successfully..")
        localStorage.clear()
        navigate('/log')
      }
    }
    };

   

console.log(password)

  return (
    <div>
         <Container className="d-flex flex-column align-items-center mt-5">
      <h2 className='mb-4 display-6'>Change Password</h2>
      <Form  className="w-100" style={{ maxWidth: '400px' }}>
        <Form.Group className="mb-3" controlId="formpassword">
          <Form.Label>New Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirmformpassword">
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={cpassword}
            onChange={(e) => setCpassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={(e)=>{handleSubmit(e)}} className="w-100 mt-4">
          Submit
        </Button>
      </Form>
    </Container>
    </div>
  )
}

export default Changep