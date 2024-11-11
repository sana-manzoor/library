import React, { useEffect, useState ,useContext} from 'react'
import { Table } from 'react-bootstrap'
import { booklist } from '../services/allApis'
import { bookDelete } from '../services/allApis'
import Editbook from './Editbook'
import { toast } from 'react-toastify'
import { editBookResponseContext } from '../context/ContextShare'

function Viewbook() {

  const [books,setBooks]=useState([])
  const [token,setToken]=useState("")
  const {editBookResponse,setEditBookResponse}=useContext(editBookResponseContext)

  const allBooks=async()=>{
   
    
      // console.log(reqHeader)
      const result = await booklist()
      console.log(result)
      if (result.status === 200) {
          console.log(result.data)
          setBooks(result.data)
          console.log(books)
      }
     

    }

    const deleteBook=async(id)=>{
      const reqHeader = {
          "Content-Type": "application/json", "Authorization": `Bearer ${token}`
      }
      const result=await bookDelete(id,reqHeader)
      console.log(result)
      if (result.status === 200) {
          console.log(result.data)
          allBooks()
          // setStudents(result.data)
          toast.success("delete successfull")
      }
      else{
          toast.error("deletion failed")
      }
  }

    useEffect(()=>{
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"))
      }
      allBooks()

    },[editBookResponse])


  return (
    <>
    <h2 className='text-center m-5 display-6'>List of Books</h2>
    <div className="table-responsive container">
     <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Author</th>
          <th>Category</th>
          <th>Number</th>
          <th></th>

        </tr>
      </thead>
      <tbody>
        
       {
        books?.map((item,index)=>(
          <tr>
          <td>{index+1}</td>
          <td>{item.title}</td>
          <td>{item.author}</td>
          <td>{item.category}</td>
          <td>{item.number}</td>
          <td ><i onClick={()=>{deleteBook(item._id)}} className="fa-solid fa-trash"></i><Editbook book={item} /></td>

        </tr>
        ))
       }
       
      </tbody>
    </Table>
    </div>
    </>
  )
}

export default Viewbook