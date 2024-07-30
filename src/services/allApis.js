import { commonApi } from "./commonApi";
import { BASE_URL } from "./base_url";


//to register 
export const registerApi=async (data)=>{
    return await commonApi("POST",`${BASE_URL}/student/reg`,data,'')
}

//to login
export const loginApi=async(data)=>{
    return await commonApi("POST",`${BASE_URL}/student/log`,data,'')
}

//to addbook
export const addBookApi=async(data,headers)=>{
    return await commonApi("POST",`${BASE_URL}/book/add`,data,headers)
}

//to getbooks
export const bookList=async(headers)=>{
    return await commonApi("GET",`${BASE_URL}/allbooks`,'',headers)
}

//to getstudents
export const studentsList=async(headers)=>{
    return await commonApi("GET",`${BASE_URL}/allstud`,'',headers)
}

//to delete student
export const studentDelete=async(id,header)=>{
    return await commonApi("DELETE",`${BASE_URL}/deleteStudent/${id}`,{},header)
}


//to delete book
export const bookDelete=async(id,header)=>{
    return await commonApi("DELETE",`${BASE_URL}/deleteBook/${id}`,{},header)
}

//to update book
export const editBookApi=async(header,data,id)=>{
    return await commonApi("PUT",`${BASE_URL}/book/edit/${id}`,data,header)
}



//to getbooks
export const studbookList=async()=>{
    return await commonApi("GET",`${BASE_URL}/allbooks`,'','')
}

//to add booking
export const bookingadd=async(data)=>{
    return await commonApi("POST",`${BASE_URL}/booking/add`,data,'')
}



//to decrease books
export const bookdecr=async(id)=>{
    return await commonApi("GET",`${BASE_URL}/book/dec/${id}`,'','')
}

//to get history
export const getHis=async(id)=>{
    return await commonApi("GET",`${BASE_URL}/view/history/${id}`,'','')
}

//to increase book
export const bookincr=async(id)=>{
    return await commonApi("GET",`${BASE_URL}/book/incr/${id}`,'','')
}

//to return book and update status
export const bookretrn=async(id,data)=>{
    return await commonApi("PUT",`${BASE_URL}/book/return/${id}`,data,'')
}

//to get reserve list
export const bookinglist=async()=>{
    return await commonApi("GET",`${BASE_URL}/booking/list`,'','')
}

//to update status
export const upStatus=async(id,data)=>{
    return await commonApi("PUT",`${BASE_URL}/status/book/${id}`,data,'')
}





