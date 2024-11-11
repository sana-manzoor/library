import React, { useState, useEffect, useContext } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import { BASE_URL } from '../services/base_url';
import { editBookApi, editStudApi, getstud } from '../services/allApis';
import { toast } from 'react-toastify';


function Editprofile() {

    const [preview, setPreview] = useState("https://img.freepik.com/premium-vector/user-circle-with-blue-gradient-circle_78370-4727.jpg?semt=ais_hybrid")



    const [editData, setEditData] = useState({

    })

    const [user, setUser] = useState({})


    const getData = async (id) => {
        const result = await getstud(id)
        console.log(result)
        if (result.status === 200) {

            setEditData(result.data)
            setUser(result.data)
            setPreview(result.data.profile ? `${BASE_URL}/upload/${result.data.profile}` : preview);

        }
        else {
            console.log("err")
        }
    }

    useEffect(() => {
        const excistingUser = JSON.parse(localStorage.getItem("currentUser"))
        const id = excistingUser
        console.log(id)
        getData(id)

    }, [])

    // console.log(token)
    useEffect(() => {
        if (editData.profile != user.profile) {
            setPreview(URL.createObjectURL(editData.profile))
        }
    }, [editData.profile])

    const updateProfile = async (e) => {
        e.preventDefault()
        if (!editData.name || !editData.gender || !editData.age || !editData.email || !editData.address || !editData.password || !editData.phone) {
            toast.warning("Enter Valid Values!!")

        }
        else {

            console.log("Valid")
            const bData = new FormData()
            bData.append("name", editData.name)
            bData.append("gender", editData.gender)
            bData.append("age", editData.age)
            bData.append("email", editData.email)
            bData.append("address", editData.address)
            bData.append("password", editData.password)
            bData.append("phone", editData.phone)
            bData.append("profile", editData.profile)
            console.log(bData)
            if (!editData.profile) {
                const reqHeader = {
                    "Content-Type": "application/json"
                }
                const res = await editBookApi(reqHeader, bData, user._id)
                console.log(res)
                if (res.status == 200) {
                    toast.success("Profile Updated Successfully!!")

                }
                else {
                    toast.error(res.response)
                }
            }
            else {
                const reqHeader = {
                    "Content-Type": "multipart/form-data"
                }
                const res = await editStudApi(reqHeader, bData, user._id)
                console.log(res)
                if (res.status == 200) {

                    toast.success("Profile Updated Successfully!!")

                }
                else {
                    toast.error(res.response)
                }
            }

        }
    }



    console.log(editData)
    return (
        <div>
            <>




                <div className='row align-items-center'>
                    <div className='col-lg-4'>
                        <label htmlFor="profile">
                            <input type="file" id='profile' style={{ display: 'none' }} onChange={(e) => setEditData({ ...editData, profile: e.target.files[0] })} />
                            {/* <img src={preview ? preview : `${BASE_URL}/upload/${user.profile}`} className='img-fluid m-4' alt="" /> */}
                            <img src={preview ?preview :(user.profile ? `${BASE_URL}/upload/${user.profile}` : "https://img.freepik.com/premium-vector/user-circle-with-blue-gradient-circle_78370-4727.jpg?semt=ais_hybrid")} />
                        </label>
                    </div>
                    <div className='col-lg-8'>
                        <div className='d-flex align-items-center flex-column '>

                            <form className='w-100  mt-4'>
                                <div className='container'>
                                    <Form>

                                        <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label style={{ fontSize: '16.5px', fontWeight: '400' }} column sm="2">
                                                Name:
                                            </Form.Label>
                                            <Col sm="10">
                                                <Form.Control type="text" placeholder="title" defaultValue={user.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput2">
                                            <Form.Label style={{ fontSize: '17px', fontWeight: '400' }} column sm="2">
                                                Gender:
                                            </Form.Label>
                                            <Col sm="10">

                                                <input type="radio" id='male' name="gender" value="male" onChange={(e) => setEditData({ ...editData, gender: e.target.value })} checked={editData.gender === 'male'} />Male <input type="radio" id='female' name="gender" checked={editData.gender === 'female'} onChange={(e) => setEditData({ ...editData, gender: e.target.value })} value="female" />Female
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput3">
                                            <Form.Label style={{ fontSize: '17px', fontWeight: '400' }} column sm="2">
                                                Age:
                                            </Form.Label>
                                            <Col sm="10">
                                                <Form.Control type="number" placeholder="age" defaultValue={user.age} onChange={(e) => setEditData({ ...editData, age: e.target.value })} />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput4">
                                            <Form.Label style={{ fontSize: '16.5px', fontWeight: '400' }} column sm="2">
                                                Email:
                                            </Form.Label>
                                            <Col sm="10">
                                                <Form.Control type="text" placeholder="email" defaultValue={user.email} onChange={(e) => setEditData({ ...editData, email: e.target.value })} />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput4">
                                            <Form.Label style={{ fontSize: '16.5px', fontWeight: '400' }} column sm="2">
                                                Address:
                                            </Form.Label>
                                            <Col sm="10">
                                                <Form.Control type="text" placeholder="address" defaultValue={user.address} onChange={(e) => setEditData({ ...editData, address: e.target.value })} />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput4">
                                            <Form.Label style={{ fontSize: '16.5px', fontWeight: '400' }} column sm="2">
                                                Password:
                                            </Form.Label>
                                            <Col sm="10">
                                                <Form.Control type="password" placeholder="password" defaultValue={user.password} onChange={(e) => setEditData({ ...editData, password: e.target.value })} />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput4">
                                            <Form.Label style={{ fontSize: '16.5px', fontWeight: '400' }} column sm="2">
                                                Phone:
                                            </Form.Label>
                                            <Col sm="10">
                                                <Form.Control type="number" placeholder="phone" defaultValue={user.phone} onChange={(e) => setEditData({ ...editData, phone: e.target.value })} />
                                            </Col>
                                        </Form.Group>
                                        <div className="d-flex justify-content-center">
                                            <button className='btn btn-primary' onClick={(e) => { updateProfile(e) }}>Update</button>

                                        </div>
                                    </Form>
                                </div>


                            </form><br />




                        </div>
                    </div>
                </div>

                {/* <ToastContainer/>   */}
            </>
        </div>
    )
}

export default Editprofile