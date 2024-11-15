import React, { useEffect, useState } from 'react';
import { studentsList, studentDelete } from '../services/allApis';
import { Table } from 'react-bootstrap';
import { toast } from 'react-toastify';

function Viewstudent() {
  const [students, setStudents] = useState([]);
  const [token, setToken] = useState("");

  const viewStudents = async () => {
    const reqHeader = {
      "Content-Type": "application/json","Authorization": `Bearer ${token}`
    };
    const result = await studentsList(reqHeader);
    console.log(result);
    if (result.status === 200) {
      console.log(result.data);
      setStudents(result.data);
    }
  };

  const deleteStudent = async (id) => {
    const reqHeader = {
      "Content-Type": "application/json","Authorization": `Bearer ${token}`
    };
    const result = await studentDelete(id, reqHeader);
    console.log(result);
    if (result.status === 200) {
      console.log(result.data);
      viewStudents();
      toast.success("Delete successful");
    } else {
      toast.error("Deletion failed");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
    viewStudents();
  }, []);

  return (
    <>
      <h2 className="text-center m-5 display-6">List of Students</h2>
      <div className="table-responsive container">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {students?.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.gender}</td>
                <td>{item.email}</td>
                <td>{item.address}</td>
                <td>{item.phone}</td>
                <td onClick={() => deleteStudent(item._id)} style={{ cursor: 'pointer' }}>
                  <i className="fa-solid fa-trash"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default Viewstudent;
