import React, { useState, createContext } from 'react'

export const editHistoryResponseContext = createContext()

export const editStatusResponseContext = createContext()




function ContextShare({ children }) {

  const [editHistoryResponse, setEditHistoryResponse] = useState({})

  const [editStatusResponse, setEditStatustResponse] = useState({})


  return (
    <>
      

      <editHistoryResponseContext.Provider value={{editHistoryResponse ,setEditHistoryResponse}}>
        <editStatusResponseContext.Provider value={{editStatusResponse ,setEditStatustResponse}}>
            {children}
        </editStatusResponseContext.Provider>
      </editHistoryResponseContext.Provider>

    </>
  )
}







export default ContextShare