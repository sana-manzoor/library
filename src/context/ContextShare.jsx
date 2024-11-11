import React, { useState, createContext } from 'react'

export const editBookResponseContext = createContext()


function ContextShare({ children }) {

  const [editBookResponse, setEditBookResponse] = useState({})

  return (
    <>
      <editBookResponseContext.Provider value={{editBookResponse ,setEditBookResponse}}>
        
            {children}
    
      </editBookResponseContext.Provider>

    </>
  )
}


export default ContextShare
