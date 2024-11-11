import React, { useState, useEffect } from 'react'
import { Button, Card } from 'react-bootstrap'
import { studbookList } from '../services/allApis'
import { BASE_URL } from '../services/base_url'
import { bookdecr } from '../services/allApis'
import { bookingadd } from '../services/allApis'
import { Link } from 'react-router-dom'
import History from '../components/History'
import { toast } from 'react-toastify'


function User() {


    const [list, setList] = useState([])

    const [search,setSearch]=useState("")



    const [data, setData] = useState({
      studentid:JSON.parse(localStorage.getItem("currentUser"))
    })

    const setdate = async () => {
        let cdate = new Date()
        let date = cdate.getDate();
        let month = cdate.getMonth() + 1;
        let year = cdate.getFullYear();
        let bookingdate = `${date}-${month}-${year}`
        setData({ ...data, bookingdate })
    }

    

    const stud=()=>{
        if (localStorage.getItem("currentUser")) {
            const studentid = JSON.parse(localStorage.getItem("currentUser"))
            // console.log(studentid)
            setData({ ...data, studentid })
        }
       
    }


    const allBooks = async () => {

        // console.log(reqHeader)
        const result = await studbookList(search)
        console.log(result)
        if (result.status === 200) {
            // console.log(result.data)
            setList(result.data)

        }


    }


    // const booking = async(item) => {
    //      setData({...data, bookid:item._id })
    //      console.log(data)
    //     const res1 = await bookingadd(data)
    //     console.log(res1)
        
    //     if (res1.status === 200) {
    //         alert(`Reservation Successfull!!`)
    //         bookdecrease(res1.data.bookid)

    //     }
    //     // else {
    //     //     alert("Already reserved!")
    //     // }
    //     console.log(res1)
    // }


     const booking = async(item) => {
        const { _id: bookid } = item;
        // console.log(bookid)
         setData({...data, bookid})
        //  console.log(bookid)
         const dataToSend = { bookid, studentid: data.studentid, bookingdate: data.bookingdate ,bookname:item.title};
        
        //  console.log(dataToSend)
        const res1 = await bookingadd(dataToSend)
        console.log(res1)

        
        if (res1.status === 200) {

            const result1 = await bookdecr(bookid)
            console.log(result1)
           
                 toast.success("Reservation Successfull!!")

        }
        else if(res1.status === 400) {
            alert(res1.response)
               
        }
        else{
            toast.error(res1.response.data)
        }
        // // console.log(res1)
    }





    // const bookdecrease = async (id) => {
    //     const result = await bookdecr(id)
    //     console.log(result)
    //     if (result.status === 200) {
    //         console.log("decreased book successfully")

    //     }
    // }

    useEffect(() => {
        allBooks()
       stud()
        setdate()
    

    }, [search])

    




    // console.log(list)


    return (
        <>

            <h1>Welcome to library</h1>

          <div className='text-end'>
          <History user={data}/>
          <button className='btn btn-primary pe-2 m-2 '><Link className='text-light text-decoration-none' to={'/editprof'}>Edit Profile</Link></button>
          

          </div>
          <div className='container'>
            <input type="text " placeholder='Search your favourite books here..' className='form-control rounded' onChange={(e)=>setSearch(e.target.value)} />
          </div>
           

            {/* ---------------------------Card here------------------------------------------ */}

            <div>
                <div className='row'>
                    {/* <div className='col-lg-4'> */}
                    {  

                        list?.map(item => (
                            
                            <div className='col-lg-3'>
                                <Card style={{ width: '21rem',height:'760px' }} className='mt-5 mb-5 pb-5'>
                                    <Card.Img variant="top" style={{ height: '230px' }} src={`${BASE_URL}/upload/${item.cover}`} />
                                    <Card.Body className='text-center'>
                                        <h3>{item.title}</h3>
                                        <Card.Text>
                                            <p style={{ fontSize: '19px' }}> {item.author}</p>
                                            <p> {item.description}</p>
                                        </Card.Text>

                                       
                                        {/* <Button variant="dark" className='btn-lg' disabled={item.number==0 } onClick={() => booking(item)}>Book</Button> */}
                                    </Card.Body>
                                    {
                                            item.number==0 ?
                                            <Button variant="dark" className='btn-lg' disabled={item.number==0 }>Out of Stock</Button>
                                            :
                                            <Button variant="dark" className='btn-lg'  onClick={() => booking(item)}>Book</Button>


                                        }
                                </Card>
                            </div>
                        ))
                    }

                    {/* </div> */}

                </div>
            </div>





        </>
    )
}

export default User