import React,{useState,useEffect} from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { addBookApi } from '../services/allApis'
import { toast } from 'react-toastify'

function Bookadd() {

    const [bookData,setBookData]=useState({
        title:"", author:"", description:"",category:"",cover:"",number:"", userId:""
    })

    const [token,setToken]=useState("")

    useEffect(() => {
        const excistingUser = JSON.parse(localStorage.getItem("currentUser"))
        console.log(excistingUser)
        setBookData({ ...bookData, userId: excistingUser })
        if (localStorage.getItem("token")) {
          setToken(localStorage.getItem("token"))
        }
      }, [])


    
console.log(token)

    
  const handleAddBook = async (e) => {
    e.preventDefault()
    // console.log("handle",projectDetails.title,projectDetails.image)
    if (!bookData.title || !bookData.author || !bookData.description || !bookData.category || !bookData.cover  || !bookData.number || !bookData.userId) {
      alert("Enter Valid Values")

    }
    else {
      // const {title,overview,languages,github,demo,userId,image}=projectDetails
      // console.log(projectDetails)
      const bkData = new FormData()
      bkData.append("title", bookData.title)
      bkData.append("author", bookData.author)
      bkData.append("description", bookData.description)
      bkData.append("category", bookData.category)
      bkData.append("cover", bookData.cover)
      bkData.append("number", bookData.number)
      bkData.append("userId", bookData.userId)

      console.log(bkData)


      const reqHeader = {
        // "Content-Type":"multipart/form-data","Authorization":`Bearer ${token}`
        "Content-Type": "multipart/form-data", "Authorization": `Bearer ${token} `
      }
      console.log(reqHeader);
      const res = await addBookApi(bkData, reqHeader)
      console.log(res);
      if (res.status === 200) {
        // setAddProjectResponse(res.data)
        toast.success("book added successfully..!!")
        setBookData({ title:" ", author:" ", description:" ",category:" ",cover:" ",number:" " })
       
        // navigate('/admindashboard')
      }
      else {
        toast.error("Book adding failed..!!")
      }


    }
  }


console.log(bookData)
    return (
        <>
            <h2 className='text-center display-6'>Add Book</h2>
            <div style={{ height: '85vh' }} className='d-flex justify-content-center align-items-center'>

                <form action="" className='w-50'>
                    <div className="mb-3 mt-3">
                        <label for="title" className="form-label">Title:</label>
                        <input type="text" className="form-control" id="title" placeholder="Enter name" name="title" value={bookData.title} onChange={(e) => { setBookData({ ...bookData, title: e.target.value }) }} />
                    </div>
                    <div class="mb-3 mt-3">
                        <label for="author" className="form-label">Author:</label>
                        <input type="text" className="form-control" id="author" placeholder="Enter authors name" name="author" value={bookData.author} onChange={(e) => { setBookData({ ...bookData, author: e.target.value }) }}/>
                    </div>
                    <div class="mb-3 mt-3">
                        <label for="description" className="form-label">Description:</label>
                        <input type="text" className="form-control" id="description" placeholder="description" name="description" value={bookData.description} onChange={(e) => { setBookData({ ...bookData, description: e.target.value }) }} />
                    </div>
                    <div class="mb-3 mt-3">
                        <label for="category" className="form-label">Category:</label>
                        <input type="text" className="form-control" id="category" placeholder=" category" name="category" value={bookData.category} onChange={(e) => { setBookData({ ...bookData, category: e.target.value }) }} />
                    </div>
                    <div class="mb-3">
                        <label for="pwd" className="form-label">Cover:</label>
                        <input type="file" className="form-control" id="cover" placeholder="Cover" name="cover"  onChange={(e) => { setBookData({ ...bookData, cover: e.target.files[0] }) }} />
                    </div>
                    <div class="mb-3">
                        <label for="number" className="form-label">Number:</label>
                        <input type="number" className="form-control" id="number" placeholder="number" name="number" value={bookData.number} onChange={(e) => { setBookData({ ...bookData, number: e.target.value }) }}/>
                    </div>

                    <button  className="btn btn-primary" onClick={handleAddBook}>Add</button>
                </form>


            </div>
        </>
    )
}

export default Bookadd