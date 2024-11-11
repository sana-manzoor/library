import React, { useState, useEffect, useContext } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import { BASE_URL } from '../services/base_url';
import { editBookApi } from '../services/allApis';
import { toast } from 'react-toastify';
import { editBookResponseContext } from '../context/ContextShare';

function Editbook({ book }) {

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setPreview("")
    }
    const handleShow = () => setShow(true);

    const [token, setToken] = useState("")

    const [preview, setPreview] = useState("")

    const {editBookResponse,setEditBookResponse}=useContext(editBookResponseContext)


    const [editData, setEditData] = useState({
        title: book.title, author: book.title, description: book.author, category: book.category, cover: book.cover, number: book.number, userId:book.userId

    })

    useEffect(() => {
        const excistingUser = JSON.parse(localStorage.getItem("currentUser"))
        setEditData({ ...editData, userId: excistingUser })
        if (localStorage.getItem("token")) {
          setToken(localStorage.getItem("token"))
        }
      }, [])
    
    // console.log(token)
      useEffect(() => {
        if (editData.cover != book.cover) {
          setPreview(URL.createObjectURL(editData.cover))
        }
      }, [editData.cover])

    const updateBook = async () => {
        if (!editData.title || !editData.author || !editData.description || !editData.category || !editData.cover || !editData.number) {
           toast.warning("Enter Valid Values!!")

        }
        else {

            console.log("Valid")
            const bData = new FormData()
            bData.append("title", editData.title)
            bData.append("author", editData.author)
            bData.append("description", editData.description)
            bData.append("category", editData.category)
            bData.append("cover", editData.cover)
            bData.append("number", editData.number)
            bData.append("userId", editData.userId)
            console.log(bData)
            if(editData.cover == book.cover){
                const reqHeader={
                  "Content-Type": "application/json", "Authorization": `Bearer ${token} `
                }
                const res=await  editBookApi(reqHeader,bData,book._id)
                console.log(res)
                if(res.status==200){
                    setEditBookResponse(res.data)
                  toast.success("Book item Updated Successfully!!")
                  handleClose()
                }
                else{
                  toast.error(res.response)
                }
              }
              else {
                const reqHeader={
                  "Content-Type": "multipart/form-data", "Authorization": `Bearer ${token} `
                }
                const res=await editBookApi(reqHeader,bData,book._id)
                console.log(res)
                if(res.status==200){
               setEditBookResponse(res.data)
                 toast.success("book Updated Successfully!!")
                   handleClose()
                }
                else{
                 toast.error(res.response)
                }
             }
            
        }
    }
    console.log(editData)

    // console.log(book)
    return (
        <div>
            <>
                <i className="fa-regular fa-pen-to-square fa-lg" onClick={handleShow} ></i>

                <Modal className='modal-xl'
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header >
                        <Modal.Title>Edit Book</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <div className='row align-items-center'>
                            <div className='col-lg-4'>
                                <label htmlFor="food">
                                    <input type="file" id='food' style={{ display: 'none' }} onChange={(e) => setEditData({ ...editData, cover: e.target.files[0] })} />
                                    <img src={preview ? preview : `${BASE_URL}/upload/${book.cover}`} className='img-fluid m-4' alt="" />
                                </label>
                            </div>
                            <div className='col-lg-8'>
                                <div className='d-flex align-items-center flex-column'>


                                    <form className='w-100  mt-4'>
                                        <Form>

                                            <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput1">
                                                <Form.Label style={{ fontSize: '16.5px', fontWeight: '400' }} column sm="2">
                                                    Title:
                                                </Form.Label>
                                                <Col sm="10">
                                                    <Form.Control type="text" placeholder="title" defaultValue={book.title} onChange={(e) => setEditData({ ...editData, title: e.target.value })} />
                                                </Col>
                                            </Form.Group>

                                            <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput2">
                                                <Form.Label style={{ fontSize: '17px', fontWeight: '400' }} column sm="2">
                                                    Author:
                                                </Form.Label>
                                                <Col sm="10">
                                                    <Form.Control type="text" placeholder="Author" defaultValue={book.author} onChange={(e) => setEditData({ ...editData, author: e.target.value })} />
                                                </Col>
                                            </Form.Group>

                                            <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput3">
                                                <Form.Label style={{ fontSize: '17px', fontWeight: '400' }} column sm="2">
                                                    Description:
                                                </Form.Label>
                                                <Col sm="10">
                                                    <Form.Control type="text" placeholder="description" defaultValue={book.description} onChange={(e) => setEditData({ ...editData, description: e.target.value })} />
                                                </Col>
                                            </Form.Group>

                                            <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput4">
                                                <Form.Label style={{ fontSize: '16.5px', fontWeight: '400' }} column sm="2">
                                                    Category:
                                                </Form.Label>
                                                <Col sm="10">
                                                    <Form.Control type="text" placeholder="category" defaultValue={book.category} onChange={(e) => setEditData({ ...editData, category: e.target.value })} />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput4">
                                                <Form.Label style={{ fontSize: '16.5px', fontWeight: '400' }} column sm="2">
                                                    Number:
                                                </Form.Label>
                                                <Col sm="10">
                                                    <Form.Control type="number" placeholder="number of copies" defaultValue={book.number} onChange={(e) => setEditData({ ...editData, number: e.target.value })} />
                                                </Col>
                                            </Form.Group>
                                        </Form>


                                    </form><br />




                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-dark" className='btn btn-lg' style={{ textAlign: 'center' }} onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="outline-dark" className='btn btn-lg' style={{ textAlign: 'center' }} onClick={updateBook} >Update</Button>

                    </Modal.Footer>
                </Modal>
                {/* <ToastContainer/>   */}
            </>
        </div>
    )
}

export default Editbook