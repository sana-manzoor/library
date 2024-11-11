import React, { useEffect, useState ,useContext} from 'react'
import { Table } from 'react-bootstrap'
import { getHis } from '../services/allApis'
import { Modal, Button } from 'react-bootstrap'
import { bookretrn } from '../services/allApis'
import { editHistoryResponseContext } from '../context/ContextShare'
import { toast } from 'react-toastify'

function History({ user }) {

    const [history, setHistory] = useState([])

    const [datas, setDatas] = useState({
        status:"returned"
    })

    
    // const {editHistoryResponse,setEditHistoryResponse}=useContext(editHistoryResponseContext)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const getHistory = async () => {
        setShow(true);
        const res = await getHis(user.studentid)
        console.log(res)
        setHistory(res.data)

    }

   
   

    

    const setdate = () => {
        let cdate = new Date()
        let date = cdate.getDate();
        let month = cdate.getMonth() + 1;
        let year = cdate.getFullYear();
        let returndate = `${date}-${month}-${year}`
      
        setDatas({...datas,returndate })
        
    }



    const handlereturn = async (id) => {
        const rest = await bookretrn(id,datas)
        console.log(rest)
        if(rest.status==200){
           
            getHistory()
            toast.success("book succesfully returned")
        }
            else{
                toast.error(rest.response.data)
              }
       

    }



    //  console.log(datas)

    useEffect(() => {
        setdate()
       
    }, [])

   

    return (
        <>

            <button className='btn btn-primary pe-2 ' onClick={getHistory} >
                View History
            </button>

            <Modal show={show} onHide={handleClose} size='xl' centered='true' >
                <Modal.Header closeButton>
                    <Modal.Title>History</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped bordered hover className='me-3 ms-3'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Book Name</th>
                                <th>Booking Date</th>
                                <th>Returning Date</th>
                                <th></th>


                            </tr>
                        </thead>
                        <tbody>

                            {
                                history.map((item, index) => (
                                    
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{item.bookname}</td>
                                        <td>{item.bookingdate}</td>

                                        
                                        <td>{item.returndate}</td>
                                      {
                                          item.returndate ? 
                                          <td></td>
                                        :

                                        <td><button className='btn btn-outline-dark' onClick={() => handlereturn(item._id)}>Return</button></td>

                                      }
                                        {/* <td><button className='btn btn-outline-dark' ></button></td>
                                        :
                                        <td><button className='btn btn-outline-dark' onClick={() => handlereturn(item._id)}>Return</button></td>
 */}




                                    </tr>
                                ))
                            }



                        </tbody>
                    </Table>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>




        </>
    )
}

export default History