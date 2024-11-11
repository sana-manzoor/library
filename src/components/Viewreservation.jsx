import React, { useEffect, useState,useContext } from 'react'
import { Table } from 'react-bootstrap'
import { bookinglist } from '../services/allApis'
import { bookincr } from '../services/allApis'
import { upStatus } from '../services/allApis'
import { editStatusResponseContext } from '../context/ContextShare'
import { toast } from 'react-toastify'

function Viewreservation() {

    const [list, setList] = useState([])

    const [appr, setAppr] = useState({
        status: "approved"
    })

 


    const bbookings = async () => {
        const result = await bookinglist()
        // console.log(result)
        if (result.status === 200) {
            // console.log(result.data)
            setList(result.data)

        }
    }

    const approve = async (item) => {
        const bid = item.bookid
        const id = item._id
        console.log(bid)

        const res = await bookincr(bid)
        console.log(res)

        if (res.status === 200) {
            const result1 = await updatestatus(id)
           
            console.log(result1)

          
                toast.success("Book Approved Successfullly!!")
                bbookings()
            


        }
       
        else {
            toast.error(res.response.data)
        }



    }

    const updatestatus = async (id) => {
        const result1 = await upStatus(id, appr)
        if (result1.status === 200) {
            // setEditStatusResponse(result1.data)
            console.log(result1.data)

        }
        else {
            console.log("status failed to update")
        }
    }

    useEffect(() => {
        bbookings()
    }, [])

    console.log(list)
    return (
        <>
            <h2 className='text-center m-5 display-6'>List of Reservations</h2>
            <div className="table-responsive container">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Bookname</th>
                        <th>bookId</th>
                        <th>StudentId</th>
                        <th>BookingDate</th>
                        <th>ReturnDate</th>
                        <th>Status</th>




                    </tr>
                </thead>
                <tbody>
                    {
                        list?.map((item, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{item.bookname}</td>
                                <td>{item.bookid}</td>
                                <td>{item.studentid}</td>

                                <td>{item.bookingdate}</td>
                                <td>{item.returndate}</td>

                                {
                                    item.status == "returned" ?
                                        <td><button className='btn btn-dark' onClick={() => approve(item)}>Approve</button></td>
                                        :
                                        <td>{item.status}</td>
                                }


                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            </div>

        </>
    )
}

export default Viewreservation